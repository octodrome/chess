import {
    findAllGamesFromUserInDB,
    findAllGamesInDB,
} from '../../../db/game.service'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (query.user) return await findAllGamesFromUserInDB(query.user as string)
    else return await findAllGamesInDB()
})
