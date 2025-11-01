import bcrypt from "bcryptjs";
import User from "../modal/userSchema.js";
import { createError } from "../utils/error.handle.js";

import jwt from 'jsonwebtoken';

export const loginUser = async (req, res, next) => {
  try {
    const { userName, password } = await req.body;

    if (!userName) return res.status(500).json({ error: "userName required!" });
    if (!password) return res.status(500).json({ error: "password required!" });

    const user = await User.findOne({
      userName: userName,
    });

    if (!user) return res.status(400).json({ error: "User Not found" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordCorrect) return res.status(400).json({ error: "password dosn't match!" });


    if (user && isPasswordCorrect) {

      const token = await new Promise((resolve, reject) => {
        jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "15d" },
          (err, token) => {
            if (err) reject(err);
            else resolve(token);
          }
        );
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development" ? true : false,
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60 * 1000, 
      });
      return res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        profile: user.profile,
      });
    }
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
