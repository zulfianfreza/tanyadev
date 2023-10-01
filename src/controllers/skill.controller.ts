import { NextFunction, Request, Response } from "express";
import * as SkillService from "../services/skill.service";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SkillService.getAll();

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSkillByTechSlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SkillService.getSkillByTechSlug(req);

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SkillService.addSkill(req);

    res.status(201).json({
      status_code: 201,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SkillService.deleteSkill(req);

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SkillService.updateSkill(req);

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { index, getSkillByTechSlug, store, update, destroy };
