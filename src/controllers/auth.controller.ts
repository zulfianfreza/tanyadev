import { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { loginSchema } from "../validations/auth.schema";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = loginSchema.parse(req.body);

    const result = await AuthService.login(input);

    res.cookie("jwt", result.token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status_code: 200,
      message: "success",
      data: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        gitaId: result.user.gitaId,
        token: result.token,
      },
    });
  } catch (error) {
    next(error);
  }
};
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.register(req);

    res.status(201).json({
      status_code: 201,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res
    .status(200)
    .json({ status_code: 200, message: "Logged out successfully" });
};

export { login, register, logout };
