import { Request } from "express";
import UserModel from "../models/user.model";
import createHttpError from "http-errors";
import skillModel from "../models/skill.model";

const getProfile = async (req: Request) => {
  const { userId } = req.body.user;
  const user = await UserModel.findById(userId)
    .populate({
      path: "skills",
      populate: {
        path: "tech",
        select: "_id name slug image",
      },
    })
    .select(
      "_id name email password expert gitaId bio gender profileImage skills"
    );

  if (!user) {
    throw createHttpError(404, "user not found");
  }

  // user.populate("skills", { populate: "tech", model: "Tech" });
  return user;
};

const registerExpert = async (req: Request) => {
  const { bio, gender, profileImage, skill } = req.body;
  const { userId } = req.body.user;

  if (!bio || !gender || !profileImage) {
    throw createHttpError(
      400,
      "please provide bio, gender, profileImage and skill"
    );
  }

  const user = await UserModel.findById(userId);

  if (user?.expert) {
    throw createHttpError(500, "you have registered as an expert.");
  }

  const skillResult = await skillModel.create({
    tech: skill.techId,
    price: skill.price,
    per: skill.per,
    expert: userId,
  });

  const result = await UserModel.findOneAndUpdate(
    {
      _id: userId,
    },

    {
      expert: true,
      bio,
      gender,
      profileImage,
      $push: {
        skills: skillResult._id,
      },
    },

    { new: true, runValidators: true }
  );

  return result;
};

const getAllUsers = async () => {
  const result = await UserModel.find().populate({
    path: "skills",
    populate: {
      path: "tech",
    },
  });

  return result;
};

const getAllExperts = async () => {
  const result = await UserModel.find({ expert: true }).populate({
    path: "skills",
    populate: {
      path: "tech",
    },
  });
  return result;
};

const getUserByGitaId = async (req: Request) => {
  const { gitaId } = req.params;
  const result = await UserModel.findOne({ gitaId }).populate({
    path: "skills",
    populate: {
      path: "tech",
    },
  });

  if (!result) {
    throw createHttpError(404, "user not found");
  }

  return result;
};

export {
  getProfile,
  registerExpert,
  getAllUsers,
  getAllExperts,
  getUserByGitaId,
};
