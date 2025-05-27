import EmployeeModel from "../models/EmployeeModel.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const addEmployee = async (req, res) => {
  // console.log(req.file)
  // console.log(req.body)
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;
    //console.log(req.body);
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "email already present in database",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const imageFile = req.file;
    let imageURL;
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      imageURL = imageUpload.secure_url;
    }
    const newUser = new UserModel({
      name,
      email,
      role,
      password: hashPassword,
      profileImage: imageURL,
    });
    const savedUser = await newUser.save();
    //console.log(savedUser)
    const newEmployee = new EmployeeModel({
      UserId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();
    return res
      .status(200)
      .json({ success: true, message: "employee Created Successfully" });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      message: error.message || "Internal Server Error (Employee)",
      success: false,
    });
  }
};
export const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find()
      .populate("UserId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error (get Employee)",
    });
  }
};
// most loved one
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await EmployeeModel.findById({ _id: id })
      .populate("UserId", { password: 0 })
      .populate("department");
    if (!employee) {
      const employee = await EmployeeModel.findOne({ UserId: id })
        .populate("department")
        .populate("UserId", { password: 0 });
      // console.log(employee);
      return res.status(200).json({ success: true, employee });
    }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get empbyId Internal server Error" });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, salary, maritalStatus, department } = req.body;
    const employee = await EmployeeModel.findById({ _id: id });
    if (!employee) {
      res.status(404).json({ success: false, error: "Employee Not Found" });
    }
    const user = await UserModel.findById({ _id: employee.UserId });
    if (!user) {
      res.status(404).json({
        success: false,
        error: "Employee Associated With User Not Found",
      });
    }
    const updateUser = await UserModel.findByIdAndUpdate(
      { _id: employee.UserId },
      { name }
    );
    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      { _id: id },
      { maritalStatus, designation, salary, department }
    );
    if (!updateEmployee || !updateUser) {
      return res
        .status(500)
        .json({ success: false, error: "Updating Issue Caming Up" });
    }
    return res.status(200).json({ success: true, message: "Employee Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get emp Internal server " });
  }
};

export const fetchEmployeesByDepId = async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const employee = await EmployeeModel.find({ department: id });
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "get empbyDept.Id Internal server Error",
    });
  }
};
