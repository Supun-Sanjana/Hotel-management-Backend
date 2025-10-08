import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import otp from "../model/otp.js";

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


        const genOtp = Math.floor(1000 + Math.random() * 9000);
        const newotp = new otp({
            email: user.email,
            otp: genOtp
        })

        newotp.save()
         sendOtpEmail(user.email, genOtp)

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

//send email
export function sendOtpEmail(email, otp) {

    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "luxespherelk@gmail.com",
            pass: "czpb rxke oyqw vvan"
        }
    })

    const mesage = {
        from: "luxespherelk@gmail.com",
        to: email,
        subject: "Validating OTP",
        text: "Your OTP is " + otp
    }

    transport.sendMail(mesage, (err, info) => {
        if (err) {
            console.log(err);

        } else {
            console.log(info);

        }
    })
}