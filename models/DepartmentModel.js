import mongoose from "mongoose";
import EmployeeModel from "./EmployeeModel.js";
import LeaveModel from "./LeaveModel.js";
import SalaryModel from "./SalaryModel.js";
import UserModel from "./UserModel.js";
const departmentSchema = new mongoose.Schema({
  dep_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // Step 1: Find employees in the department
      const employees = await EmployeeModel.find({
        department: this._id,
      }).populate("UserId");

      const empIds = employees.map((emp) => emp._id);

      // Step 2: Extract User _id from each employee
      const userIds = employees.map((emp) => emp.UserId?._id).filter(Boolean); // Filter out null/undefined just in case

      // Step 3: Delete all associated documents
      await EmployeeModel.deleteMany({ department: this._id });
      await LeaveModel.deleteMany({ employeeId: { $in: empIds } });
      await SalaryModel.deleteMany({ employeeId: { $in: empIds } });
      await UserModel.deleteMany({ _id: { $in: userIds } });

      next();
    } catch (error) {
      next(error);
    }
  }
);


const departmentModel = mongoose.model("department", departmentSchema);
export default departmentModel;
