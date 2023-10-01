import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import { Skill, SkillSchema, skillSchema } from "./skill.model";
enum Gender {
  male = "male",
  female = "female",
}

export interface UserSchema {
  name: string;
  email: string;
  password: string;
  gitaId: number;
  expert: boolean;
  gender?: Gender;
  bio?: string;
  profileImage?: string;
  skills: Skill[];
}

export interface UserDocument extends UserSchema, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gitaId: {
      type: Number,
    },
    expert: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: [Gender.male, Gender.female],
    },
    bio: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (_next) {
  const user = this;

  if (!user.isModified("password")) {
    return _next();
  }

  const hash = await bcrypt.hash(user.password, 12);
  const id = (Math.random() * 100000000).toString().substring(0, 8);

  user.password = hash;
  user.gitaId = Number(id);
  _next();
});

export type User = InferSchemaType<typeof userSchema>;

export default mongoose.model<User>("User", userSchema);
