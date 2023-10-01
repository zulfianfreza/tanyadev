import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: "1d" });

  return token;
};

export const verifyToken = ({ token }: { token: string }) =>
  jwt.verify(token, config.jwtSecret);
