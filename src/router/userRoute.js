import express from 'express'
import { register, login, getUser } from '../controller/userController.js'

const userRoute = express.Router()

userRoute.post('/', register)
userRoute.post('/login', login)
userRoute.get('/', getUser)

export default userRoute