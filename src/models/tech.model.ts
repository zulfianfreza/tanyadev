import mongoose from "mongoose";
import slugify from "slugify";

export interface TechSchema {
  name: string;
  slug: string;
  image: string;
}

export interface TechDocument extends TechSchema, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const techSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  image: imageSchema,
});

techSchema.pre("save", function (_next) {
  const tech = this;
  if (!tech.name) {
    return _next();
  }
  tech.slug = slugify(tech.name, { lower: true, replacement: "-" });
  _next();
});

export type Tech = mongoose.InferSchemaType<typeof techSchema>;

export default mongoose.model("Tech", techSchema);
