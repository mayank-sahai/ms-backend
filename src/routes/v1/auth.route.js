import express from 'express'
import logger from '../../config/logger.js'
const router = express.Router()

router.get('/ping', (req, res) => {
    logger.info('ping requested')
    res.send('Hello World from auth route!')
    logger.info('ping exiting')
})

export default router
