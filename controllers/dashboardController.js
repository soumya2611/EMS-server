import DepartmentModel from "../models/DepartmentModel.js";
import EmployeeModel from "../models/EmployeeModel.js";
import LeaveModel from "../models/LeaveModel.js";
import SalaryModel from "../models/SalaryModel.js";

export const getSummary = async (req, res) => {
  try {
    const totalEmployees = await EmployeeModel.countDocuments();
    const totalDepartments = await DepartmentModel.countDocuments();
    const totalSalaries = await SalaryModel.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$netSalary" } } },
    ]);
    const employeeAppliedForLeave = await LeaveModel.distinct("employeeId");
    
     const leaveStatus = await LeaveModel.aggregate([
       {
         $group: {
           _id: "$status", 
           count: { $sum: 1 },
         },
       },
     ]);
      const leaveSummary = {
        appliedFor: employeeAppliedForLeave.length,
        approved:
          leaveStatus.find((item) => item._id === "Approved")?.count || 0,
        rejected:
          leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
        pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
      };
      
      
    return res
      .status(200)
      .json({
        totalEmployees,
        totalDepartments,
        totalSalary: totalSalaries[0]?.totalSalary || 0,
        leaveSummary,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "get dashboard Internal server Error",
    });
  }
};
