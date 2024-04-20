// authUtils.js
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.accessExpirationMinutes });
};

export { generateToken };
