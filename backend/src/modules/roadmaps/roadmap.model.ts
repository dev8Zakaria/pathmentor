import { Schema, model, Types } from "mongoose";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "BLOCKED";

export type RoadmapTask = {
  id: string;
  title: string;
  description: string;
  skill: string;
  status: TaskStatus;
  estimatedHours: number;
  resources: string[];
};

export type RoadmapPhase = {
  id: string;
  title: string;
  order: number;
  objective: string;
  tasks: RoadmapTask[];
};

export type RoadmapDocument = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  careerGoalId: string;
  title: string;
  status: "ACTIVE" | "ARCHIVED";
  progressPercentage: number;
  summary: string;
  phases: RoadmapPhase[];
  generatedBy: "AI_WORKFLOW";
  createdAt: Date;
  updatedAt: Date;
};

const taskSchema = new Schema<RoadmapTask>(
  {
    id: String,
    title: String,
    description: String,
    skill: String,
    status: { type: String, enum: ["TODO", "IN_PROGRESS", "DONE", "BLOCKED"], default: "TODO" },
    estimatedHours: Number,
    resources: { type: [String], default: [] }
  },
  { _id: false }
);

const phaseSchema = new Schema<RoadmapPhase>(
  {
    id: String,
    title: String,
    order: Number,
    objective: String,
    tasks: { type: [taskSchema], default: [] }
  },
  { _id: false }
);

const roadmapSchema = new Schema<RoadmapDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    careerGoalId: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "ARCHIVED"], default: "ACTIVE" },
    progressPercentage: { type: Number, default: 0 },
    summary: { type: String, default: "" },
    phases: { type: [phaseSchema], default: [] },
    generatedBy: { type: String, enum: ["AI_WORKFLOW"], default: "AI_WORKFLOW" }
  },
  { timestamps: true }
);

export const Roadmap = model<RoadmapDocument>("Roadmap", roadmapSchema);
