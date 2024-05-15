import express from "express";
import protectedRoute from "../middleware/protectRoute.js";
import { sendMessage, getMessages } from "../controllers/message.js";

const router = express.Router();

router.post("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
