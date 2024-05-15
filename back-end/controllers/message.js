import Messages from "../modal/messageSchema.js";
import Conversation from "../modal/conversationScheme.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const { message } = req.body;

    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      perticipents: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        perticipents: [senderId, reciverId],
      });
    }

    const newMessage = new Messages({
      senderId,
      reciverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    const reciverSocketId = getReciverSocketId(reciverId);

    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }
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
