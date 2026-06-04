import { Types } from "mongoose";
import { Profile } from "../users/profile.model";
import { CareerGoal } from "../career-goals/careerGoal.model";
import { QuizAttempt } from "../quiz/quiz.model";
import { Resource } from "../resources/resource.model";
import { Project } from "../projects/project.model";
import { AiProfile } from "./aiProfile.model";
import { Roadmap, type RoadmapPhase } from "../roadmaps/roadmap.model";
import type { ConversationMessage } from "../mentor/conversation.model";
import { skillGraph } from "../../seed/catalog";
import { safeRedisGet, safeRedisSet } from "../../databases/redis";
import { AppError } from "../../utils/errors";
import { generateGeminiJson, generateGeminiText, isGeminiEnabled } from "./gemini.service";

type CareerId = keyof typeof skillGraph;
type AiProvider = "gemini" | "mock";
type MentorAnswerResult = { answer: string; provider: AiProvider };

type GeminiRoadmapDraft = {
  summary: string;
  phases: Array<{
    id?: string;
    title: string;
    order?: number;
    objective: string;
    tasks: Array<{
      id?: string;
      title: string;
      description: string;
      skill: string;
      status?: string;
      estimatedHours?: number;
      resources?: string[];
    }>;
  }>;
};

function normalizeKnown(technologies: string[]) {
  return new Set(technologies.map((item) => item.toLowerCase().trim()));
}

function detectMissingSkills(careerGoalId: string, knownTechnologies: string[], weaknesses: string[]) {
  const requiredSkills = skillGraph[careerGoalId as CareerId] ?? skillGraph.career_software_engineer;
  const known = normalizeKnown(knownTechnologies);
  const weak = new Set(weaknesses.map((item) => item.toLowerCase()));
  return requiredSkills.filter((skill) => !known.has(skill.toLowerCase()) || weak.has(skill.toLowerCase()));
}

function taskHours(weeklyStudyHours: number, ratio: number, minimum: number) {
  return Math.max(minimum, Math.round(weeklyStudyHours * ratio));
}

function buildRoadmapPhases(missingSkills: string[], weeklyStudyHours: number, careerName: string): RoadmapPhase[] {
  const prioritized = missingSkills.length > 0 ? missingSkills : ["Project Practice", "Testing", "Deployment"];
  const phaseBlueprints = [
    {
      id: "phase_1",
      title: "Calibrate the foundations",
      objective: `Close the most important gaps first: ${prioritized.slice(0, 3).join(", ")}.`,
      skills: prioritized.slice(0, 3),
      mode: "foundation"
    },
    {
      id: "phase_2",
      title: "Build a professional core project",
      objective: `Turn the foundations into a realistic ${careerName} project.`,
      skills: prioritized.slice(3, 6).length ? prioritized.slice(3, 6) : prioritized.slice(0, 3),
      mode: "build"
    },
    {
      id: "phase_3",
      title: "Add quality, reliability, and evidence",
      objective: "Make the work portfolio-ready with tests, documentation, and operational habits.",
      skills: prioritized.slice(6, 9).length ? prioritized.slice(6, 9) : ["Testing", "Docker", "Documentation"],
      mode: "quality"
    },
    {
      id: "phase_4",
      title: "Capstone and interview readiness",
      objective: "Package the work as evidence for internships, junior roles, and technical interviews.",
      skills: prioritized.slice(9, 12).length ? prioritized.slice(9, 12) : ["System Design", "Project Practice", "Career Story"],
      mode: "capstone"
    }
  ];

  return phaseBlueprints.map((phase, phaseIndex) => ({
    id: phase.id,
    title: phase.title,
    order: phaseIndex + 1,
    objective: `${phase.objective} Recommended pace: ${weeklyStudyHours}h/week.`,
    tasks: phase.skills.flatMap((skill, skillIndex) => [
      {
        id: `p${phaseIndex + 1}_s${skillIndex + 1}_learn`,
        title: `Understand ${skill} in context`,
        description: `Study the core ideas, write a one-page technical note, and explain how ${skill} appears in real ${careerName} work.`,
        skill,
        status: "TODO" as const,
        estimatedHours: taskHours(weeklyStudyHours, 0.35, 2),
        resources: []
      },
      {
        id: `p${phaseIndex + 1}_s${skillIndex + 1}_deliver`,
        title: `Produce evidence for ${skill}`,
        description: "Create a visible deliverable: code, tests, diagram, README section, or demo note. Acceptance criterion: another developer can review it without extra explanation.",
        skill,
        status: "TODO" as const,
        estimatedHours: taskHours(weeklyStudyHours, 0.55, 3),
        resources: []
      }
    ]).concat([
      {
        id: `p${phaseIndex + 1}_review`,
        title: phase.mode === "capstone" ? "Run a capstone review" : "Weekly review and adjustment",
        description: phase.mode === "capstone"
          ? "Record a short demo, update your portfolio README, list trade-offs, and prepare three interview stories from the project."
          : "Mark blockers, update progress, choose the next highest-leverage task, and ask the mentor one specific technical question.",
        skill: "Career Execution",
        status: "TODO" as const,
        estimatedHours: 1,
        resources: []
      }
    ])
  }));
}

function attachResourcesToTasks(phases: RoadmapPhase[], resources: Array<{ _id: unknown; skillTags: string[] }>) {
  return phases.map((phase) => ({
    ...phase,
    tasks: phase.tasks.map((task) => ({
      ...task,
      resources: resources
        .filter((resource) => resource.skillTags.includes(task.skill))
        .slice(0, 2)
        .map((resource) => String(resource._id))
    }))
  }));
}

function normalizeTaskId(value: string | undefined, fallback: string) {
  const normalized = value?.toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "");
  return normalized || fallback;
}

function normalizeGeminiRoadmap(draft: GeminiRoadmapDraft): { summary: string; phases: RoadmapPhase[] } | null {
  if (!draft.summary || !Array.isArray(draft.phases) || draft.phases.length < 3) return null;

  const phases = draft.phases.slice(0, 4).map((phase, phaseIndex) => {
    if (!phase.title || !phase.objective || !Array.isArray(phase.tasks) || phase.tasks.length < 3) return null;

    const tasks = phase.tasks.slice(0, 7).map((task, taskIndex) => {
      if (!task.title || !task.description || !task.skill) return null;
      return {
        id: normalizeTaskId(task.id, `p${phaseIndex + 1}_t${taskIndex + 1}`),
        title: task.title.slice(0, 120),
        description: task.description.slice(0, 700),
        skill: task.skill.slice(0, 80),
        status: "TODO" as const,
        estimatedHours: Math.max(1, Math.min(24, Math.round(task.estimatedHours ?? 3))),
        resources: []
      };
    });

    if (tasks.some((task) => task === null)) return null;
    return {
      id: normalizeTaskId(phase.id, `phase_${phaseIndex + 1}`),
      title: phase.title.slice(0, 100),
      order: phase.order ?? phaseIndex + 1,
      objective: phase.objective.slice(0, 500),
      tasks: tasks as RoadmapPhase["tasks"]
    };
  });

  if (phases.some((phase) => phase === null)) return null;
  return { summary: draft.summary.slice(0, 1200), phases: phases as RoadmapPhase[] };
}

async function generateGeminiRoadmap(input: {
  careerName: string;
  careerDescription: string;
  detectedLevel: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  knownTechnologies: string[];
  completedProjects: string[];
  weeklyStudyHours: number;
}) {
  const prompt = `You are PathMentor AI, a senior computer science professor and senior career advisor.

Create a personalized, practical learning roadmap for a student preparing for this career:
Career: ${input.careerName}
Career description: ${input.careerDescription}
Detected level: ${input.detectedLevel}
Quiz score: ${input.score}/100
Weekly study time: ${input.weeklyStudyHours} hours
Known technologies: ${input.knownTechnologies.join(", ") || "none"}
Completed projects: ${input.completedProjects.join(", ") || "none"}
Strengths from diagnostic: ${input.strengths.join(", ") || "not enough evidence"}
Weaknesses from diagnostic: ${input.weaknesses.join(", ") || "not enough evidence"}
Priority gaps: ${input.missingSkills.join(", ") || "portfolio depth, testing, deployment, interview readiness"}

Rules:
- Act like a rigorous CS professor: no vague tasks, no duplicate answers, no childish wording.
- Act like a practical career advisor: each phase must produce visible evidence for a portfolio, interview, or internship application.
- Produce exactly 4 phases.
- Each phase must contain 4 to 6 tasks.
- Keep task titles specific, concise, and action-oriented.
- Every task must include a concrete deliverable or acceptance criterion.
- Use only status "TODO".
- Keep estimatedHours realistic for the student's weekly hours.
- Return strict JSON only. No markdown.

JSON shape:
{
  "summary": "string",
  "phases": [
    {
      "id": "phase_1",
      "title": "string",
      "order": 1,
      "objective": "string",
      "tasks": [
        {
          "id": "phase_1_task_1",
          "title": "string",
          "description": "string",
          "skill": "string",
          "status": "TODO",
          "estimatedHours": 3,
          "resources": []
        }
      ]
    }
  ]
}`;

  const draft = await generateGeminiJson<GeminiRoadmapDraft>(prompt, {
    maxOutputTokens: 4096,
    temperature: 0.25
  });

  return normalizeGeminiRoadmap(draft);
}

function buildFallbackMentorAnswer(input: {
  careerName?: string;
  focus: string;
  nextTask?: { title: string; estimatedHours: number };
  question: string;
}) {
  return [
    `Context: you are preparing for ${input.careerName ?? "a technical career"}. Your current focus areas are ${input.focus}.`,
    input.nextTask ? `Best next move: ${input.nextTask.title} (${input.nextTask.estimatedHours}h). Use it as practical evidence, not just study time.` : "Best next move: generate or refresh your roadmap after completing the diagnostic.",
    `Short answer: ${input.question.toLowerCase().includes("docker") ? "Docker packages an application with its runtime environment so it behaves consistently across machines. Learn it by containerizing one API, adding env variables, then explaining the difference between image, container, volume, and network." : "Start with a minimal example, prove you understand it, then convert it into a small deliverable someone else can review."}`,
    "When you ask follow-up questions, include: goal, what you tried, exact error or confusion, and the next hypothesis. That makes mentor help much sharper."
  ].join("\n\n");
}

function formatMentorHistory(history: ConversationMessage[]) {
  return history
    .slice(-10)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n")
    .slice(-4000);
}

export async function generateRoadmapForUser(userId: string) {
  const profile = await Profile.findOne({ userId });
  if (!profile?.targetCareerId) {
    throw new AppError(400, "Profile and target career are required before roadmap generation");
  }

  const careerGoal = await CareerGoal.findById(profile.targetCareerId);
  if (!careerGoal) throw new AppError(404, "Career goal not found");

  const latestAttempt = await QuizAttempt.findOne({ userId, careerGoalId: profile.targetCareerId }).sort({ completedAt: -1 });
  if (!latestAttempt) throw new AppError(400, "Quiz is required before roadmap generation");

  const missingSkills = detectMissingSkills(profile.targetCareerId, profile.knownTechnologies, latestAttempt.weaknesses);
  const resources = await Resource.find({ skillTags: { $in: missingSkills } }).lean();
  const projects = await Project.find({ skillTags: { $in: missingSkills } }).lean();

  const detectedLevel = latestAttempt.score >= 75 ? "Advanced" : latestAttempt.score >= 45 ? "Intermediate" : "Beginner";
  let aiProvider: AiProvider = "mock";
  let summary = `Profile ${detectedLevel}. Strengths: ${latestAttempt.strengths.join(", ") || "to confirm"}. Priority gaps: ${missingSkills.slice(0, 5).join(", ") || "portfolio depth and interview readiness"}. This roadmap is designed to produce reviewable evidence, not just passive learning.`;
  let phases = buildRoadmapPhases(missingSkills, profile.weeklyStudyHours, careerGoal.name);

  if (isGeminiEnabled()) {
    try {
      const geminiRoadmap = await generateGeminiRoadmap({
        careerName: careerGoal.name,
        careerDescription: careerGoal.description,
        detectedLevel,
        score: latestAttempt.score,
        strengths: latestAttempt.strengths,
        weaknesses: latestAttempt.weaknesses,
        missingSkills,
        knownTechnologies: profile.knownTechnologies,
        completedProjects: profile.completedProjects,
        weeklyStudyHours: profile.weeklyStudyHours
      });

      if (geminiRoadmap) {
        summary = geminiRoadmap.summary;
        phases = geminiRoadmap.phases;
        aiProvider = "gemini";
      }
    } catch {
      aiProvider = "mock";
    }
  }

  phases = attachResourcesToTasks(phases, resources);

  await Roadmap.updateMany({ userId, status: "ACTIVE" }, { $set: { status: "ARCHIVED" } });
  const roadmap = await Roadmap.create({
    userId,
    careerGoalId: profile.targetCareerId,
    title: `Roadmap ${careerGoal.name} - ${careerGoal.estimatedDurationWeeks} weeks`,
    summary,
    phases
  });

  await AiProfile.findOneAndUpdate(
    { userId, careerGoalId: profile.targetCareerId },
    {
      userId,
      careerGoalId: profile.targetCareerId,
      summary,
      detectedLevel,
      strengths: latestAttempt.strengths,
      gaps: missingSkills,
      recommendedFocus: missingSkills.slice(0, 5),
      generatedAt: new Date()
    },
    { upsert: true, new: true }
  );

  await safeRedisSet(`roadmap:cache:user:${userId}`, JSON.stringify(roadmap), 60 * 10);

  return { roadmap, aiSummary: summary, recommendedProjects: projects.slice(0, 3), aiProvider };
}

export async function getCachedOrActiveRoadmap(userId: string) {
  const cached = await safeRedisGet(`roadmap:cache:user:${userId}`);
  if (cached) return JSON.parse(cached);
  return Roadmap.findOne({ userId, status: "ACTIVE" }).sort({ createdAt: -1 });
}

export async function generateMentorAnswer(userId: string, question: string, history: ConversationMessage[] = []): Promise<MentorAnswerResult> {
  const historyDigest = Buffer.from(formatMentorHistory(history)).toString("base64").slice(0, 80);
  const cacheKey = `ai_answer:v2:${userId}:${historyDigest}:${Buffer.from(question).toString("base64").slice(0, 80)}`;
  const cached = await safeRedisGet(cacheKey);
  if (cached) return JSON.parse(cached) as MentorAnswerResult;

  const [profile, roadmap, aiProfile] = await Promise.all([
    Profile.findOne({ userId }).lean(),
    Roadmap.findOne({ userId, status: "ACTIVE" }).sort({ createdAt: -1 }).lean(),
    AiProfile.findOne({ userId }).sort({ generatedAt: -1 }).lean()
  ]);

  const career = profile?.targetCareerId ? await CareerGoal.findById(profile.targetCareerId).lean() : null;
  const focus = aiProfile?.recommendedFocus?.slice(0, 3).join(", ") || "your priority foundations";
  const nextTask = roadmap?.phases.flatMap((phase) => phase.tasks).find((task) => task.status !== "DONE");

  let result: MentorAnswerResult = {
    provider: "mock",
    answer: buildFallbackMentorAnswer({
      careerName: career?.name,
      focus,
      nextTask,
      question
    })
  };

  if (isGeminiEnabled()) {
    try {
      const prompt = `You are PathMentor AI, a senior computer science professor and career mentor.

Student context:
- Target career: ${career?.name ?? "not selected yet"}
- Current level: ${profile?.currentLevel ?? "unknown"}
- Known technologies: ${profile?.knownTechnologies?.join(", ") || "none"}
- Completed projects: ${profile?.completedProjects?.join(", ") || "none"}
- Recommended focus: ${focus}
- Active roadmap: ${roadmap?.title ?? "not generated"}
- Next unfinished task: ${nextTask ? `${nextTask.title} (${nextTask.estimatedHours}h)` : "none"}

Recent conversation:
${formatMentorHistory(history) || "No previous messages in this conversation."}

Student question:
${question}

Answer rules:
- Be direct, specific, and mentor-like.
- Prefer actionable steps, technical correctness, and portfolio evidence.
- If the question is unclear, state the missing information and still give the best next move.
- Keep the answer under 220 words unless the user explicitly asks for depth.
- Do not invent user achievements or data.`;

      result = {
        provider: "gemini",
        answer: await generateGeminiText(prompt, { maxOutputTokens: 900, temperature: 0.35 })
      };
    } catch {
      result.provider = "mock";
    }
  }

  await safeRedisSet(cacheKey, JSON.stringify(result), 60 * 15);
  return result;
}

export function toObjectId(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new AppError(400, "Invalid id");
  return new Types.ObjectId(id);
}
