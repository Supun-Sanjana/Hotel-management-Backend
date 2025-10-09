import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import otp from "../model/otp.js";

//register
export const register = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password, type, image } = req.body

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
            type,
            image
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

//get user
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

//getall users
export function getAllUsers(req, res) {
    User.find()
        .then((result) => {
            res.json({ list: result }); // wrapped in an object
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
}

//delete user
export function deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json({ message: "User deleted" });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
}

// PATCH /api/v1/users/:id/toggle
export const toggleUserDisabled = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.disabled = !user.disabled;
    await user.save();
    res.json({ success: true, disabled: user.disabled });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


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

//validate otp
export function verifyUserEmail(req, res) {
    const email = req.body.email
    const Otp = req.body.otp

    otp.find({ email: email }).sort({ date: -1 }).then((otpList) => {
        if (otpList.length == 0) {
            res.json({ message: "OTP is invalid" })

        } else {
            const lastOtp = otpList[0]
            if (lastOtp.otp == Otp) {
                User.findOneAndUpdate({ email: email }, { emailVerified: true }).then(() => {
                    res.json({ message: "OTP is verified successfully" })
                })

            } else {
                res.json({ message: "OTP is invalid" })
            }
        }
    })
}

// resend otp
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const genOtp = Math.floor(1000 + Math.random() * 9000);

        // Remove any old OTPs for that email
        await otp.deleteMany({ email });

        // Create and save new OTP
        await new otp({ email, otp: genOtp }).save();

        // Send email again
        await sendOtpEmail(email, genOtp);

        res.json({ message: "New OTP sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to resend OTP" });
    }
};
