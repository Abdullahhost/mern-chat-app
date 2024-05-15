// import jwt from "jsonwebtoken";

import User from "../modal/userSchema.js";
const protectedRoute = async (req, res, next) => {
  try {
    const token = req.body.userProfileId;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized User. User not Found" });
    }

    const decoded = await User.findById(token).select("-password");
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "User not found!" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ error: "Internal Error!" });
  }
};

export default protectedRoute;
