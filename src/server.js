import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import passport from 'passport'
import { defaultlimiter } from './middlewares/ratelimitter.js'
import config from './config/config.js'
import logger from './config/logger.js'
import { jwtStrategy } from './config/passport.js'
import v1Router from './routes/v1/index.js'

const app = express()

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

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// //limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//     app.use('/v1/auth', authLimiter);
//   }
app.use(defaultlimiter);

// v1 api routes
app.use('/v1', v1Router)

app.listen(config.port, () => {
    logger.info(`Backend app listening on port ${config.port}`)
})
