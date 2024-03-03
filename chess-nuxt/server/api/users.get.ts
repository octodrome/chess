import { findAllUsersInDB } from '../db/user.service'

// @TODO add typescript support https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
export default defineEventHandler(async (event) => {
    console.log('GET /api/users')
    try {
        return findAllUsersInDB()
    } catch (err) {
        console.error(err)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
