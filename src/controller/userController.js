import User from "../model/user.js";

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

//register
export const register = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body

        if (!firstName || !userName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        // const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, 10);

        const user = new User({
            firstName,
            lastName,
            userName,
            email,
            password: hashPassword,
            type: req.body.type
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

//login
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        const user = await User.findOne({ email })
        //const credentials = req.body
        //User.findOne({email : credentials.uername , password : credentials.password})
        if (!user) return res.status(404).json({ message: "User not found !" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" })

        const token = jwt.sign({ id: user._id, email, type: user.type, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: "72h" }
        )

        return res.status(200).json({ message: "Login success", token, user })


    } catch (error) {
        console.log(error);

    }
}

export const isAdminValid = (req) => {
    if (!req.user) {
        return false
    }

    if (req.user.type !== "admin") {
        return false
    }
    return true
}

export function isCustomerValid(req) {
    if (!req.user) {
        return false
    }
    if (req.user.type !== "user") {
        return false
    }
    return true
}

export function getUser(req, res) {
    const user = req.user
    if (user == null) {
        res.json({ message: "User not found" });
    } else {
        res.json({
            message: "Found User",
            User: user
        })
    }
}