import logger from '../config/logger.js'
import { userService } from '../services/index.js'

const getAllUsers = async (req, res) => {
    try {
        logger.info('getAllUsers requested')
        const users = await userService.getAllUsers()
        logger.info('getAllUsers exiting')
        res.send({
            status: 'success',
            data: users,
        })
    } catch (err) {
        logger.error('Error occurred while fetching users', error)
        res.status(500).send({
            status: 'error',
            message: 'An error occurred while fetching users',
        })
    }
}
export default {
    getAllUsers,
}
