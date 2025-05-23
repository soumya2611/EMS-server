import express from "express";
const router = express.Router();
import { verifyUser } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/settingController.js";


router.put("/change-password", verifyUser, changePassword);


export default router;
