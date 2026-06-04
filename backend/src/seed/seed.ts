import bcrypt from "bcryptjs";
import { connectMongo, disconnectMongo } from "../databases/mongodb";
import { getNeo4jDriver, closeNeo4j } from "../databases/neo4j";
import { User } from "../modules/users/user.model";
import { Profile } from "../modules/users/profile.model";
import { CareerGoal } from "../modules/career-goals/careerGoal.model";
import { QuizTemplate } from "../modules/quiz/quiz.model";
import { Resource } from "../modules/resources/resource.model";
import { Project } from "../modules/projects/project.model";
import { careerGoals, prerequisiteEdges, projects, quizTemplates, resources, skillGraph } from "./catalog";

async function seedNeo4j(resetDatabase: boolean) {
  const driver = getNeo4jDriver();
  const session = driver.session();
  try {
    if (resetDatabase) {
      await session.run("MATCH (n) DETACH DELETE n");
    }
    for (const career of careerGoals) {
      await session.run("MERGE (c:Career {id: $id}) SET c.name = $name", { id: career._id, name: career.name });
      for (const skill of skillGraph[career._id as keyof typeof skillGraph]) {
        await session.run(
          "MERGE (s:Skill {name: $skill}) MERGE (c:Career {id: $careerId}) MERGE (c)-[:REQUIRES]->(s)",
          { skill, careerId: career._id }
        );
      }
    }
    for (const [skill, prerequisite] of prerequisiteEdges) {
      await session.run(
        "MERGE (s:Skill {name: $skill}) MERGE (p:Skill {name: $prerequisite}) MERGE (s)-[:REQUIRES]->(p)",
        { skill, prerequisite }
      );
    }
    for (const project of projects) {
      for (const skill of project.skillTags) {
        await session.run(
          "MERGE (p:Project {id: $id}) SET p.title = $title MERGE (s:Skill {name: $skill}) MERGE (p)-[:PRACTICES]->(s)",
          { id: project._id, title: project.title, skill }
        );
      }
    }
    for (const resource of resources) {
      for (const skill of resource.skillTags) {
        await session.run(
          "MERGE (r:Resource {id: $id}) SET r.title = $title, r.url = $url MERGE (s:Skill {name: $skill}) MERGE (r)-[:TEACHES]->(s)",
          { id: resource._id, title: resource.title, url: resource.url, skill }
        );
      }
    }
  } finally {
    await session.close();
  }
}

async function main() {
  await connectMongo();
  const resetDatabase = process.env.RESET_DATABASE === "true";

  if (resetDatabase) {
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      CareerGoal.deleteMany({}),
      QuizTemplate.deleteMany({}),
      Resource.deleteMany({}),
      Project.deleteMany({})
    ]);
  }

  await Promise.all(
    careerGoals.map((career) =>
      CareerGoal.findByIdAndUpdate(career._id, career, { upsert: true, new: true })
    )
  );
  await Promise.all(
    resources.map((resource) =>
      Resource.findByIdAndUpdate(resource._id, resource, { upsert: true, new: true })
    )
  );
  await Promise.all(
    projects.map((project) =>
      Project.findByIdAndUpdate(project._id, project, { upsert: true, new: true })
    )
  );
  await Promise.all(
    Object.entries(quizTemplates).map(([careerGoalId, questions]) => {
      return QuizTemplate.findByIdAndUpdate(
        `quiz_${careerGoalId}`,
        {
          _id: `quiz_${careerGoalId}`,
          careerGoalId,
          title: `Diagnostic ${careerGoals.find((career) => career._id === careerGoalId)?.name ?? careerGoalId}`,
          questions
        },
        { upsert: true, new: true }
      );
    })
  );

  let student = await User.findOne({ email: "student@pathmentor.ai" });
  if (!student) {
    student = await User.create({
      email: "student@pathmentor.ai",
      passwordHash: await bcrypt.hash("Password123!", 12),
      role: "STUDENT"
    });
  }
  await Profile.findOneAndUpdate(
    { userId: student._id },
    {
      userId: student._id,
      fullName: "Étudiant Démo",
      educationLevel: "Licence informatique",
      currentLevel: "Intermediate",
      weeklyStudyHours: 8,
      knownTechnologies: ["JavaScript", "Git", "HTML", "CSS"],
      preferredLearningStyle: ["projects", "documentation"],
      targetCareerId: "career_software_engineer"
    },
    { upsert: true, new: true }
  );

  const admin = await User.findOne({ email: "admin@pathmentor.ai" });
  if (!admin) {
    await User.create({
      email: "admin@pathmentor.ai",
      passwordHash: await bcrypt.hash("Admin123!", 12),
      role: "ADMIN"
    });
  }

  try {
    await seedNeo4j(resetDatabase);
    console.log("[seed] Neo4j graph seeded");
  } catch (error) {
    console.warn("[seed] Neo4j seed skipped:", error instanceof Error ? error.message : error);
  }

  console.log("[seed] MongoDB seeded");
  await closeNeo4j();
  await disconnectMongo();
}

main().catch(async (error) => {
  console.error(error);
  await closeNeo4j();
  await disconnectMongo();
  process.exit(1);
});
