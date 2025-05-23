import express from "express";
const router = express.Router();
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployeeById,
  editEmployee,
  fetchEmployeesByDepId,
} from "../controllers/employeeController.js";

 router.get("/", verifyUser, getEmployees);
router.post("/add", verifyUser, upload.single("profileImage"), addEmployee);
router.get("/:id", verifyUser, getEmployeeById);
 router.put("/:id", verifyUser, editEmployee);
 router.get("/department/:id", verifyUser, fetchEmployeesByDepId);

export default router;
