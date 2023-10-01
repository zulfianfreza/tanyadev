import { Request } from "express";
import createHttpError from "http-errors";
import slugify from "slugify";
import TechModel from "../models/tech.model";
import cloudinary from "../utils/cloudinary";

const createTech = async (req: Request) => {
  const { name } = req.body;
  const image = req.file;

  if (!name || !image) {
    throw createHttpError(404, "please provide name");
  }

  const isExist = await TechModel.findOne({ name });

  if (isExist) {
    throw createHttpError(400, "name is exist, try again with other name");
  }

  const imageUpload = await cloudinary.uploader.upload(image.path);

  const result = await TechModel.create({
    name,
    image: {
      imageUrl: imageUpload.secure_url,
      cloudinaryId: imageUpload.public_id,
    },
  });

  return result;
};

const getAllTech = async () => {
  const techs = await TechModel.find();

  const teches = techs.map((tech, index) => {
    return {
      id: index + 1,
      name: tech.name,
      slug: tech.slug,
      image: tech.image?.imageUrl,
    };
  });

  return teches;
};

const getTechById = async (req: Request) => {
  const { techId } = req.params;

  const result = await TechModel.findById(techId);

  if (!result) {
    throw createHttpError(404, "data not found");
  }

  return result;
};

const updateTech = async (req: Request) => {
  const { techId } = req.params;
  const { name } = req.body;

  const result = await TechModel.findOneAndUpdate(
    { _id: techId },
    { name, slug: slugify(name, { lower: true }) },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteTech = async (req: Request) => {
  const { techId } = req.params;

  const find = await TechModel.findById(techId);

  if (!find || !find.image?.cloudinaryId) {
    throw createHttpError(404, "data not found");
  }

  await cloudinary.uploader.destroy(find.image?.cloudinaryId);

  const result = await TechModel.deleteOne(find._id);

  return result;
};

export { createTech, deleteTech, getAllTech, getTechById, updateTech };
