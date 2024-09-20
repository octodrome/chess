import {
    findAllOpponentsInDB,
    findAllUsersInDB,
} from '../../../db/user.service'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (query.except) return await findAllOpponentsInDB(query.except as string)
    else return await findAllUsersInDB()
})
