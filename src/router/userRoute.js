import express from 'express'
import { register, login, getUser, sendSampleEmail } from '../controller/userController.js'

const userRoute = express.Router()

userRoute.post('/', register)
userRoute.post('/login', login)
userRoute.get('/', getUser)

userRoute.post("/email", sendSampleEmail)

export default userRoute