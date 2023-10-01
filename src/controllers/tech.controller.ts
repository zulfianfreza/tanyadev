import { NextFunction, Request, Response } from "express";
import * as TechService from "../services/tech.service";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TechService.getAllTech();

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
    const result = await TechService.createTech(req);

    res.status(201).json({
      status_code: 201,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TechService.getTechById(req);

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
    const result = await TechService.updateTech(req);

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TechService.deleteTech(req);

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { index, find, store, update, destroy };
