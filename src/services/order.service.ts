import { Request } from "express";
import createHttpError from "http-errors";
import OrderModel from "../models/order.model";
import SkillModel from "../models/skill.model";

const createOrder = async (req: Request) => {
  const { userId } = req.body.user;
  const { skillId, quantity } = req.body;

  if (!skillId || !quantity) {
    throw createHttpError(
      400,
      "please provide skillId, quantity, and totalPrice."
    );
  }

  const skill = await SkillModel.findOne({ _id: skillId });

  if (skill?.expert == userId) {
    throw createHttpError(400, "you cannot order yourself");
  }

  const result = await OrderModel.create({
    customer: userId,
    skill: skillId,
    quantity,
    totalPrice: quantity * (skill?.price ?? 0),
  });

  return result;
};

const getAll = async (req: Request) => {
  const { userId } = req.body.user;
  const result = await OrderModel.find({ customer: userId }).populate([
    {
      path: "customer",
    },
    {
      path: "skill",
      populate: [
        {
          path: "tech",
        },
        {
          path: "expert",
        },
      ],
    },
  ]);

  return result;
};

export { createOrder, getAll };
