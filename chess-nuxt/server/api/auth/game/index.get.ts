import {
    findAllGamesFromUserInDB,
    findAllGamesInDB,
} from '../../../db/game.service'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    let gameList
    if (query.user) {
        gameList = await findAllGamesFromUserInDB(query.user as string)
    } else {
        gameList = await findAllGamesInDB()
    }
    return gameList
})
