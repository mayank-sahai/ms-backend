import logger from '../config/logger.js'
import { userService } from '../services/index.js'
import {  hashPassword, comparePassword } from '../utils/password.util.js'
import {  generateToken } from '../utils/auth.util.js'

const signup = async (req, res) => {
    try {
        logger.info('signup requested')
        const { name, email, password } = req.body

        const userExist = await userService.getUserByEmail(email)
        if (userExist) {
            res.json({ status: 'error', message: 'account already exists' })
        }
        const passwordHash = await hashPassword(password);
        const newUser = await userService.createUser({ name, email, password: passwordHash })
        if (newUser) {
            res.json({ status: 'success', message: 'account created, please login' })
        }
    } catch (err) {
        logger.error('Error occurred while signing up user', err)
        res.status(500).send({
            status: 'error',
            message: 'An error occurred while signing up users',
        })
    }
}

const login = async (req, res) => {
    try {
        logger.info('login requested')
        const { email, password } = req.body
        const usedData = await userService.getUserByEmail(email);
        if(!usedData){
            res.json({ status: 'error', message: 'account does not exists' })
        }
        if(!comparePassword(usedData.password, password)){
            res.json({ status: 'error', message: 'invalid credentials' })
        }
        const token = generateToken(usedData);
        res.json({ status: 'success', data: token })
    } catch (err) {
        logger.error('Error occurred while login', err)
        res.status(500).send({
            status: 'error',
            message: 'An error occurred while login',
        })
    }
}

export default {
    signup,
    login
}
