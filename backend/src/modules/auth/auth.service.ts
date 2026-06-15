import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { safeRedisSet } from "../../databases/redis";
import { User } from "../users/user.model";
import { Profile } from "../users/profile.model";
import { AppError } from "../../utils/errors";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function signTokens(userId: string) {
  const accessToken = jwt.sign({}, env.JWT_ACCESS_SECRET, { subject: userId, expiresIn: "20m" });
  const refreshToken = jwt.sign({}, env.JWT_REFRESH_SECRET, { subject: userId, expiresIn: "7d" });
  return { accessToken, refreshToken };
}

export async function registerUser(input: {
  email: string;
  password: string;
  fullName: string;
  educationLevel?: string;
  weeklyStudyHours?: number;
}) {
  const email = normalizeEmail(input.email);
  const existing = await User.findOne({ email });
  if (existing) throw new AppError(409, "Email already registered");

  let user;
  try {
    const passwordHash = await bcrypt.hash(input.password, 12);
    user = await User.create({ email, passwordHash, role: "STUDENT" });
    await Profile.create({
      userId: user._id,
      fullName: input.fullName.trim(),
      educationLevel: input.educationLevel?.trim() ?? "",
      weeklyStudyHours: input.weeklyStudyHours ?? 6
    });
  } catch (error) {
    if (isDuplicateKeyError(error)) throw new AppError(409, "Email already registered");
    throw error;
  }

  const tokens = signTokens(user._id.toString());
  await safeRedisSet(`refresh:user:${user._id}`, tokens.refreshToken, 60 * 60 * 24 * 7);
  return { user: { id: user._id, email: user.email, role: user.role }, ...tokens };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email: normalizeEmail(email) });
  if (!user) throw new AppError(401, "Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new AppError(401, "Invalid credentials");

  user.lastLoginAt = new Date();
  await user.save();

  const tokens = signTokens(user._id.toString());
  await safeRedisSet(`refresh:user:${user._id}`, tokens.refreshToken, 60 * 60 * 24 * 7);
  return { user: { id: user._id, email: user.email, role: user.role }, ...tokens };
}

export function refreshAccessToken(refreshToken: string) {
  const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { sub: string };
  return {
    accessToken: jwt.sign({}, env.JWT_ACCESS_SECRET, { subject: payload.sub, expiresIn: "20m" })
  };
}

function isDuplicateKeyError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}
