import departmentModel from "../models/DepartmentModel.js";

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new departmentModel({
      dep_name,
      description,
    });
    await newDep.save();
    res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await departmentModel.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get dept Internal server Error" });
  }
};
export const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDept = await departmentModel.findByIdAndUpdate(
      { _id: id },
      { dep_name: dep_name, description: description }
    );
    return res.status(200).json({ success: true, updateDept });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get dept Internal server KendiPOMPOM" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDep = await departmentModel.findById({ _id: id });
    await deleteDep.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Department Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error (delete)" });
  }
};
