import express from 'express'
import { register, login, getUser } from '../controller/userController.js'

const router = express.Router()

router.post('/', register)
router.post('/login', login)
router.get('/', getUser)

export default router