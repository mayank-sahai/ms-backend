import prisma from '../db/index.js'

const getAllUsers = async () => {
    const allUsers = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
        },
    })
    console.log(allUsers)
    return allUsers
}

const getUserById = async (id) => {
    const userData = await prisma.user.findUnique({
        where: {
            id,
          },
    })
     return userData;
}

const getUserByEmail = async (email) => {
    const userData = await prisma.user.findUnique({
        where: {
            email
          },
    })
     return userData;
}

const createUser = async (data) => {
    const userData = await prisma.user.create({
        data
    })
     return userData;
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser
}
