import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, UserId } = req.body;
    
      // console.log(req.body)
    const user = await userModel.findById({ _id: UserId });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }
    const checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkPassword) {
      return res
        .status(404)
        .json({ success: false, error: "Wrong OldPassword 😒" });
      } const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt)
      const newUser = await userModel.findByIdAndUpdate({ _id: UserId }, { password: hashPassword })
      return res.status(200).json({success:true,message:"Password Updated ^_~"})
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        error: "setting controller Internal server Error",
      });
  }
};
