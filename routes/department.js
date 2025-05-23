import express from 'express'
const router = express.Router();
import {verifyUser} from '../middleware/authMiddleware.js'
import { addDepartment, deleteDepartment, editDepartment, getDepartmentById, getDepartments } from '../controllers/departmentController.js';

router.post('/add', verifyUser, addDepartment)
router.get('/', verifyUser, getDepartments)
router.get("/:id", verifyUser, getDepartmentById);
router.put("/:id", verifyUser, editDepartment);
router.delete("/:id", verifyUser, deleteDepartment);


export default router