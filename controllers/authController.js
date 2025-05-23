import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
// console.log(req.body)
    const user = await User.findOne({ email });
// console.log(user)
    if (!user) {
    return  res.status(404).json({ success: false, error: "user Not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
     return res.status(403).json({ success: false, error: "Password didnot match" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10d" }
    );
    return res.status(200).json({
      success: true,
      message: "login successfully",
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verify = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
