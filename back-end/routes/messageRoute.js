import express from "express";
import protectedRoute from "../middleware/protectRoute.js";
import { sendMessage, getMessages } from "../controllers/message.js";
import multer from "multer";


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/:id", protectedRoute, getMessages);
router.post("/send/:id", upload.single("cImage"), protectedRoute, sendMessage);

export default router;
