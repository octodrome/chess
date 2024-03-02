import User from '../models/user.model'

// @TODO add typescript support https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
export default defineEventHandler(async (event) => {
    console.log('GET /api/users')
    try {
        console.log('Find users')
        const usersData = await User.find()
        return usersData.map((user) => ({
            id: user._id,
            email: user.email,
        }))
    } catch (err) {
        console.error(err)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
