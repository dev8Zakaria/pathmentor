import { Schema, model } from "mongoose";

export type ProjectDocument = {
  _id: string;
  title: string;
  description: string;
  skillTags: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
};

const projectSchema = new Schema<ProjectDocument>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    skillTags: { type: [String], default: [] },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    estimatedHours: { type: Number, default: 8 }
  },
  { timestamps: true }
);

export const Project = model<ProjectDocument>("Project", projectSchema);
