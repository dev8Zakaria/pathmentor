import { Schema, model } from "mongoose";

export type CareerGoalDocument = {
  _id: string;
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDurationWeeks: number;
  domains: string[];
  isActive: boolean;
};

const careerGoalSchema = new Schema<CareerGoalDocument>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Intermediate" },
    estimatedDurationWeeks: { type: Number, default: 12 },
    domains: { type: [String], default: [] },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const CareerGoal = model<CareerGoalDocument>("CareerGoal", careerGoalSchema);
