import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../modules/users/user.model";
import { AppError } from "../utils/errors";

export type AuthUser = {
  id: string;
  email: string;
  role: "STUDENT" | "ADMIN";
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export async function requireAuth(request: Request, _response: Response, next: NextFunction) {
  try {
    const header = request.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) throw new AppError(401, "Missing access token");

    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as { sub: string };
    const user = await User.findById(payload.sub).lean();
    if (!user) throw new AppError(401, "Invalid access token");

    request.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    };
    next();
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(401, "Invalid access token"));
  }
}

export function requireAdmin(request: Request, _response: Response, next: NextFunction) {
  if (request.user?.role !== "ADMIN") {
    next(new AppError(403, "Admin access required"));
    return;
  }
  next();
}
