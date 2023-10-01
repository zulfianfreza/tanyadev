import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getProfile(req);

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const registerExpert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserService.registerExpert(req);

    res.status(201).json({
      status_code: 201,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUsers();

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllExperts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserService.getAllExperts();

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserByGitaId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserService.getUserByGitaId(req);

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProfile,
  registerExpert,
  getAllUsers,
  getAllExperts,
  getUserByGitaId,
};
