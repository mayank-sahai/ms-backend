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
export default {
    getAllUsers,
}
