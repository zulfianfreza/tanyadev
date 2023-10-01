import { Request } from "express";
import createHttpError from "http-errors";
import UserModel, { UserDocument } from "../models/user.model";
import { generateToken } from "../utils/jwt";
import { LoginSchema } from "../validations/auth.schema";
import bcrypt from "bcrypt";

const login = async (input: LoginSchema) => {
  const { email, password } = input;

  const user = (await UserModel.findOne({ email })) as UserDocument;

  if (!user) {
    throw createHttpError(401, "invalid credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw createHttpError(401, "invalid credentials");
  }

  const token = generateToken(user._id);
  return { user, token };
};

const register = async (req: Request) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw createHttpError(400, "please provide name, email, and password");
  }

  const countUser = await UserModel.find();

  if (countUser.length == 0) {
    const newUser = await UserModel.create({ name, email, password });

    return newUser;
  }

  const checkUser = await UserModel.findOne({ email });

  if (checkUser) {
    throw createHttpError(
      409,
      "a user with this email adlready exists, please log in instead"
    );
  }

  const newUser = await UserModel.create({ name, email, password });

  return newUser;
};

export { login, register };
