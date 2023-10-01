import { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import { ZodError } from "zod";

export const notFound = (_: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  if (error instanceof ZodError) {
    statusCode = 400;
    errorMessage = JSON.stringify(error.errors);
  }
  res.status(statusCode).json({ error: errorMessage });
};
