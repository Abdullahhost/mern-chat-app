import mongoose, { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    cImage: {
      type: String,
    },
    public_id: {
      type: String
    }
  },
  { timestamps: true }
);

const Message = model("Message", MessageSchema);

export default Message;
