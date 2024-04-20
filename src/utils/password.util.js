// passwordUtils.js
import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

const comparePassword = (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash)
}

export { hashPassword, comparePassword }
