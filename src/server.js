import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import config from './config/config.js'
import logger from './config/logger.js'
const app = express()
const port = 3000

// set security headers
app.use(helmet())

// parse json request body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// Logging with Morgan
if (config.env === 'production') {
    app.use(morgan('combined', { stream: logger.stream }))
} else {
    app.use(morgan('dev'))
}

app.get('/ping', (req, res) => {
    logger.info('ping requested')
    res.send('Hello World!')
    logger.info('ping exiting')
})

app.listen(config.port, () => {
    logger.info(`Backend app listening on port ${config.port}`)
})
