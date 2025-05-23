import mongoose from "mongoose";
import { Schema } from "mongoose";
const EmployeeSchema = new Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  employeeId: { type: String, required: true, unique: true },
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: {
    type: Schema.Types.ObjectId,
    ref: "department",
    required: true,
  },
  salary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
export default EmployeeModel;
