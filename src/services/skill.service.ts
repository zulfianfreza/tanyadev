import { Request } from "express";
import SkillModel from "../models/skill.model";
import TechModel from "../models/tech.model";
import createHttpError from "http-errors";
import UserModel from "../models/user.model";

const getAll = async () => {
  const result = await SkillModel.find().populate(["expert", "tech"]);
  return result;
};

const getSkillByTechSlug = async (req: Request) => {
  const { techSlug } = req.params;
  const tech = await TechModel.findOne({ slug: techSlug });
  const result = await SkillModel.find({
    tech: tech?._id,
  }).populate(["tech", "expert"]);

  return result;
};

const addSkill = async (req: Request) => {
  const { techId, price, per } = req.body;
  const { userId } = req.body.user;

  const user = await UserModel.findById(userId);

  if (!user?.expert) {
    throw createHttpError(401, "you're not an expert yet.");
  }

  const skillExists = await SkillModel.findOne({
    expert: userId,
    tech: techId,
  });

  if (skillExists) {
    throw createHttpError(400, "you have added this skill");
  }

  const skillResult = await SkillModel.create({
    tech: techId,
    price,
    per,
    expert: userId,
  });

  const result = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $push: { skills: skillResult._id } },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteSkill = async (req: Request) => {
  const { skillId } = req.params;
  const { userId } = req.body.user;

  await SkillModel.deleteOne({ _id: skillId, expert: userId });

  const user = await UserModel.findById(userId);

  const result = await user?.updateOne(
    {
      $pull: {
        skills: skillId,
      },
    },
    { new: true, runValidators: true }
  );

  return result;
};

const updateSkill = async (req: Request) => {
  const { skillId } = req.params;
  const { userId } = req.body.user;
  const { price, per, tech } = req.body;

  const result = await SkillModel.findOneAndUpdate(
    {
      _id: skillId,
      expert: userId,
    },
    {
      price,
      per,
    },
    { new: true, runValidators: true }
  );

  return result;
};

export { getAll, getSkillByTechSlug, addSkill, updateSkill, deleteSkill };
