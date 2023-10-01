import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import createHttpError from "http-errors";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  let token;

  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) throw createHttpError(401, "There is no token");

  try {
    const payload = verifyToken({ token });

    req.body.user = payload;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { isAuthenticated };
