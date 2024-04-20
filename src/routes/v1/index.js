import express from 'express'
import passport from 'passport'
import authRouter from './auth.route.js'
import userRouter from './user.route.js'
const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', passport.authenticate('jwt', { session: false }), userRouter)

export default router