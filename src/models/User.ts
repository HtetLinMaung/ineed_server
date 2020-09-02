import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    needs: [
      {
        type: Schema.Types.ObjectId,
        ref: "need",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("user", userSchema);
