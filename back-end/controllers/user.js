import User from "../modal/userSchema.js";

export const getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (err) {
    next(err);
  }
};
export const getSingleUser = async (req, res, next) => {
  try {
    const singleUser = await User.findById(req.params.id);
    res.status(200).json(singleUser);
    console.log(singleUser);
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updateUser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted successfully !.! ");
  } catch (err) {
    next(err);
  }
};
