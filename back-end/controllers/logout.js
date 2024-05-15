export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Log out Successfully!");
  } catch (err) {
    console.log("Error : ", err.message);
    return res.status(400).json("internel logout error");
  }
};
