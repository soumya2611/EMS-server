import EmployeeModel from "../models/EmployeeModel.js";
import LeaveModel from "../models/LeaveModel.js";

export const addLeave = async (req, res) => {
  try {
    const { UserId, startDate, endDate, reason, leaveType } = req.body;
    // console.log(req.body);
    const employee = await EmployeeModel.findOne({ UserId: UserId });
    // console.log(employee)

    const newLeave = new LeaveModel({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    res.status(200).json({ success: true, message: "Leave Request Added " });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({
      message: error.message || "Internal Server Error (Employee)",
      success: false,
    });
  }
};

export const getLeavesById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    let leaves = await LeaveModel.find({ employeeId: id });
    //  console.log(leaves)
    if (!leaves || leaves.length === 0) {
      const employee = await EmployeeModel.findOne({ UserId: id });
      if (!employee) {
        console.log("No employee found for UserId:", id);
          return res.status(404).json({success:false,message:"No Employee Found"})
      }
      leaves = await LeaveModel.find({
        employeeId: employee._id,
      }).populate({
        path: "employeeId",
        populate: [
          { path: "UserId", select: "-password" },
          { path: "department", select: "dep_name" },
        ],
      });
    }
    //  console.log(leaves)
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "get leave Internal server Error" });
  }
};
export const getLeaves = async (req, res) => {
  try {
    const leaves = await LeaveModel.find().populate({
      path: "employeeId",
      populate: [
        { path: "UserId", select: "name" },
        { path: "department", select: "dep_name" },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "get empbyId Internal server Error" });
  }
};

export const getLeaveDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await LeaveModel.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        { path: "UserId", select: "-password" },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "get empbyId Internal server Error" });
  }
};

export const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const leave = await LeaveModel.findByIdAndUpdate({ _id: id }, { status });
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave Not Found" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        error: " leave Upadation Internal server Error",
      });
  }
};
