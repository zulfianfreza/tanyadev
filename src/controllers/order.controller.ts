import { NextFunction, Request, Response } from "express";
import * as OrderService from "../services/order.service";

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderService.createOrder(req);

    res.status(201).json({
      status_code: 201,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderService.getAll(req);

    res.status(200).json({
      status_code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { store, index };
