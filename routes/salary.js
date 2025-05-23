import express from "express";
const router = express.Router();
import { verifyUser } from "../middleware/authMiddleware.js";
import { addSalary, getSalaryById } from "../controllers/salaryController.js";


router.post("/add", verifyUser, addSalary);
router.get("/:id", verifyUser, getSalaryById);
// router.get("/user/:id", verifyUser, getSalaryByUserId);


export default router;
