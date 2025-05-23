import express from 'express'
const app = express();
app.use(express.json());
app.use(express.static('public/uploads'))
import cors from 'cors'
app.use(
  cors({
    origin: "https://ems-frontend-iota.vercel.app",
    credentials: true,
  })
);

import dotenv from 'dotenv'
dotenv.config();
import db from '../db.js'
//calling database ⤵️
db;

const PORT = process.env.PORT;
//Importing of all ROutes ⤵️
import authRouter from '../routes/auth.js'
import departmentRouter from '../routes/department.js'
import EmployeeRouter from '../routes/employee.js'
import SalaryRouter from '../routes/salary.js'
import LeaveRouter from '../routes/leave.js'
import SettingRouter from '../routes/setting.js'
import DashboardRouter from '../routes/dashboard.js'
//giving end points to route ⤵️
app.use('/api/auth',authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', EmployeeRouter)
app.use('/api/salary', SalaryRouter)
app.use('/api/leave', LeaveRouter)
app.use('/api/setting', SettingRouter)
app.use('/api/dashboard', DashboardRouter)
//backend Listining ⤵️

app.get("/", (req, res) => {
  res.send("WELCOME TO EMS SERVER...");
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})
