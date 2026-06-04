import { Schema, model } from "mongoose";

export type ResourceDocument = {
  _id: string;
  title: string;
  url: string;
  type: "documentation" | "course" | "video" | "article" | "practice";
  skillTags: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
};

const resourceSchema = new Schema<ResourceDocument>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ["documentation", "course", "video", "article", "practice"], required: true },
    skillTags: { type: [String], default: [] },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    language: { type: String, default: "en" }
  },
  { timestamps: true }
);

export const Resource = model<ResourceDocument>("Resource", resourceSchema);
