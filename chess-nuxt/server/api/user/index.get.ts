import { findAllOpponentsInDB, findAllUsersInDB } from '../../db/user.service'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    console.log('query', query)

    try {
        let userList
        if (query.except) {
            userList = await findAllOpponentsInDB(query.except as string)
        } else {
            userList = await findAllUsersInDB()
        }
        return userList
    } catch (error) {
        console.error(error)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
