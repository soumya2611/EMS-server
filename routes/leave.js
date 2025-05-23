import express from "express";
const router = express.Router();
import { verifyUser } from "../middleware/authMiddleware.js";
import { addLeave, getLeaveDetailById, getLeaves, getLeavesById, updateLeave } from "../controllers/leaveController.js";

router.post("/add", verifyUser, addLeave);
router.get("/:id", verifyUser, getLeavesById);
router.get("/detail/:id", verifyUser, getLeaveDetailById);
router.get("/", verifyUser, getLeaves);
router.patch("/:id", verifyUser, updateLeave);

export default router;
