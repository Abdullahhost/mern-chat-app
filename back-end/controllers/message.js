import Messages from "../modal/messageSchema.js";
import Conversation from "../modal/conversationScheme.js";
import { getReciverSocketId, io } from "../socket/socket.js";

import cloudinary from "cloudinary";
import fs from "fs-extra";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


export const sendMessage = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({ perticipents: { $all: [senderId, reciverId] }});
    if (!conversation) conversation = await Conversation.create({ perticipents: [senderId, reciverId] });
    
    let newMessage;

    if(req.file) {
      const upload = await cloudinary.v2.uploader.upload(req.file.path);

      newMessage = new Messages({
        senderId,
        reciverId,
        cImage: upload.secure_url,
        public_id: upload.public_id,
        
      })

      await fs.unlink(req.file.path);
    }else {
      newMessage = new Messages({
        senderId,
        reciverId,
        message,
      });
    }

    if (newMessage) conversation.messages.push(newMessage._id);
  
    await Promise.all([conversation.save(), newMessage.save()]);

    const reciverSocketId = getReciverSocketId(reciverId);
    if (reciverSocketId) io.to(reciverSocketId).emit("newMessage", newMessage);
  
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server Error!" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      perticipents: { $all: [senderId, userToChat] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server Error!" });
  }
};
