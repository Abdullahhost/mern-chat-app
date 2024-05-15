import cloudinary from "cloudinary";
import fs from "fs-extra";

import bcrypt from "bcryptjs";
import User from "../modal/userSchema.js";
import { createError } from "../utils/error.handle.js";
import generateTokenAndSetCokie from "../utils/generateToken.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const upload = await cloudinary.v2.uploader.upload(req.file.path);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User Already exist in Database!" });
    }
    // Convert hashed password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // saved all information
    const newUser = new User({
      userName,
      email,
      password: hash,
      profile: upload.secure_url,
      public_id: upload.public_id,
    });

    if (newUser) {
      generateTokenAndSetCokie(newUser._id, res);
      await newUser.save();
      await fs.unlink(req.file.path);

      return res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        profile: newUser.profile,
      });
    } else {
      console.log("internel Error");
      return res.status(500).json("internel Error");
    }
  } catch (err) {
    console.log(err);
    next(createError(err.status, err.message));
  }
};
