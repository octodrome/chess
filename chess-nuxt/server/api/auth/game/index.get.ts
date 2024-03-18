import {
    findAllGamesFromUserInDB,
    findAllGamesInDB,
} from '../../../db/game.service'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    console.log('query', query)

    try {
        let gameList
        if (query.user) {
            gameList = await findAllGamesFromUserInDB(query.user as string)
        } else {
            gameList = await findAllGamesInDB()
        }
        return gameList
    } catch (error) {
        console.error(error)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
