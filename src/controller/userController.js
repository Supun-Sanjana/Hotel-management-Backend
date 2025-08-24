import userSchema from '../model/user.js'
import bcrypt from "bcryptjs";


//register user
export const register = async (req, res) => {

    try {
        const { firstName, lastName, userName, email, password } = req.body

        if (!firstName || !userName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = new userSchema({
            firstName,
            lastName,
            userName,
            email,
            password: hashPassword
        })

        const savaData = await user.save()
        res.status(201).json({
                success: true,
                message: "User saved success !"
            })
    } catch (err) {
        console.log(err);

    }

}