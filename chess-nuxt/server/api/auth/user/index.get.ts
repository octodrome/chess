import {
    findAllOpponentsInDB,
    findAllUsersInDB,
} from '../../../db/user.service'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    let userList
    if (query.except) {
        userList = await findAllOpponentsInDB(query.except as string)
    } else {
        userList = await findAllUsersInDB()
    }
    return userList
})
