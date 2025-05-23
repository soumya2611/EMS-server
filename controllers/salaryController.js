import EmployeeModel from "../models/EmployeeModel.js";
import SalaryModel from "../models/SalaryModel.js";

export const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;
    //console.log(req.body);
    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new SalaryModel({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      payDate,
      netSalary: totalSalary,
    });
    await newSalary.save();
    res.status(200).json({ success: true, message: "Salary Added 💳" });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      message: error.message || "Internal Server Error (Employee)",
      success: false,
    });
  }
};

export const getSalaryById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    let salary = await SalaryModel.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );

    if (!salary || salary.length === 0) {
      const employee = await EmployeeModel.findOne({ UserId: id });

      salary = await SalaryModel.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    // console.log(error)
    return res
      .status(500)
      .json({ success: false, error: "get empbyId Internal server Error" });
  }
};

// export const getSalaryByUserId = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("get userid:", id);

//     //we have tofind the employee id by using the userId
//     const employee = await EmployeeModel.findOne({ UserId: id });
//     console.log("employee_id:", employee._id);
//     const salary = await SalaryModel.find({
//       employeeId: employee._id,
//     }).populate("employeeId", "employeeId");



//     // console.log("Salary found:", salary.length, salary);
//     return res.status(200).json({ success: true, salary });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "get empbyId Internal server Error" });
//   }
// };
