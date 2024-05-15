import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
      required: true, 
    },
    public_id: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
