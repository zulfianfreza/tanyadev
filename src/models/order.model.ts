import mongoose, { InferSchemaType } from "mongoose";

interface OrderSchema {}

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
    quantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export type Order = InferSchemaType<typeof orderSchema>;
export default mongoose.model("Order", orderSchema);
