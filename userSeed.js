import user from './models/UserModel.js'
import db from './db.js'
import bcrypt from 'bcrypt'
 db;
const userRegister = async () => {
    try {
       
        const salt= await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash("admin",salt)
        const newUser = new user({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role:"admin"
            
        })
        await newUser.save();
    } catch (error) {
        console.log(error)
    }
}
userRegister()