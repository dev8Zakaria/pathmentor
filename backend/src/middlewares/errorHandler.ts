import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

export function notFoundHandler(request: Request, _response: Response, next: NextFunction) {
  next(new AppError(404, `Route not found: ${request.method} ${request.originalUrl}`));
}

export function errorHandler(error: Error, _request: Request, response: Response, _next: NextFunction) {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  response.status(statusCode).json({
    message: error.message || "Internal server error",
    statusCode
  });
}
