import express from 'express'
import { authController } from '../../controllers/index.js'
const router = express.Router()

router.post('/signup', authController.signup)

router.post('/login', authController.login)

export default router
