import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: String,
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
