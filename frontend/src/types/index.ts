export type User = {
  _id?: string;
  id?: string;
  email: string;
  role: "STUDENT" | "ADMIN";
};

export type Profile = {
  _id: string;
  fullName: string;
  educationLevel: string;
  currentLevel: "Beginner" | "Intermediate" | "Advanced";
  domain: string;
  weeklyStudyHours: number;
  knownTechnologies: string[];
  completedProjects: string[];
  preferredLearningStyle: string[];
  targetCareerId?: string;
};

export type CareerGoal = {
  _id: string;
  name: string;
  description: string;
  difficulty: string;
  estimatedDurationWeeks: number;
  domains: string[];
};

export type QuizQuestion = {
  id: string;
  skillTag: string;
  question: string;
  options: string[];
};

export type Quiz = {
  _id: string;
  careerGoalId: string;
  title: string;
  questions: QuizQuestion[];
};

export type RoadmapTask = {
  id: string;
  title: string;
  description: string;
  skill: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "BLOCKED";
  estimatedHours: number;
  resources: string[];
};

export type Roadmap = {
  _id: string;
  title: string;
  summary: string;
  progressPercentage: number;
  phases: Array<{
    id: string;
    title: string;
    objective: string;
    order: number;
    tasks: RoadmapTask[];
  }>;
};

export type Resource = {
  _id: string;
  title: string;
  url: string;
  type: string;
  skillTags: string[];
  level: string;
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  skillTags: string[];
  estimatedHours: number;
  level: string;
};
