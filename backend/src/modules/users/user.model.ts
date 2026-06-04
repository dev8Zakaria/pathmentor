import { Schema, model, Types } from "mongoose";

export type UserRole = "STUDENT" | "ADMIN";

export type UserDocument = {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  lastLoginAt?: Date;
};

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["STUDENT", "ADMIN"], default: "STUDENT" },
    lastLoginAt: Date
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const User = model<UserDocument>("User", userSchema);
