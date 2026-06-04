import { Schema, model, Types } from "mongoose";

export type ProfileDocument = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
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

const profileSchema = new Schema<ProfileDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    fullName: { type: String, required: true },
    educationLevel: { type: String, default: "" },
    currentLevel: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    domain: { type: String, default: "Computer science" },
    weeklyStudyHours: { type: Number, default: 6 },
    knownTechnologies: { type: [String], default: [] },
    completedProjects: { type: [String], default: [] },
    preferredLearningStyle: { type: [String], default: ["projects"] },
    targetCareerId: String
  },
  { timestamps: true }
);

export const Profile = model<ProfileDocument>("Profile", profileSchema);
