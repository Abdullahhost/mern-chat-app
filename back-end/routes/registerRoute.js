import express from "express";
import multer from "multer";

import { createUser } from "../controllers/register.js";
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
router.post("/", upload.single("profile"), createUser);

export default router;
