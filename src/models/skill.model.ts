import mongoose from "mongoose";
import { Tech } from "./tech.model";
import { User } from "./user.model";

export interface SkillSchema {
  tech: Tech;
  price: number;
  per: string;
  expert: User;
}

export interface SkillDocument extends SkillSchema, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

export const skillSchema = new mongoose.Schema(
  {
    tech: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tech",
    },
    expert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price: { type: Number },
    per: { type: String },
  },
  { timestamps: true }
);

export type Skill = mongoose.InferSchemaType<typeof skillSchema>;
export default mongoose.model<Skill>("Skill", skillSchema);
