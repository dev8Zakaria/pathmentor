import { Schema, model, Types } from "mongoose";

export type AiProfileDocument = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  careerGoalId: string;
  summary: string;
  detectedLevel: "Beginner" | "Intermediate" | "Advanced";
  strengths: string[];
  gaps: string[];
  recommendedFocus: string[];
  generatedAt: Date;
};

const aiProfileSchema = new Schema<AiProfileDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    careerGoalId: { type: String, required: true },
    summary: { type: String, required: true },
    detectedLevel: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    strengths: { type: [String], default: [] },
    gaps: { type: [String], default: [] },
    recommendedFocus: { type: [String], default: [] },
    generatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const AiProfile = model<AiProfileDocument>("AiProfile", aiProfileSchema);
