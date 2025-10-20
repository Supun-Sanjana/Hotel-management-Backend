import express from 'express'
import { register, login, getUser, verifyUserEmail, getAllUsers, toggleUserDisabled, deleteUser, updateUser } from '../controller/userController.js'

const userRoute = express.Router()

userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.get('/', getUser)
userRoute.get('/get-all', getAllUsers)
userRoute.patch('/:id/toggle', toggleUserDisabled)
userRoute.post('/verify-email', verifyUserEmail)
userRoute.delete('/delete-user/:id' , deleteUser)
userRoute.put('/update/:email', updateUser);

export default userRoute