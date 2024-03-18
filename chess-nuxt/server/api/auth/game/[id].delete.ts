import { removeGameFromDB } from '../../../db/game.service'

export default defineEventHandler(async (event) => {
    console.log('DELETE api/game/:id')
    const id = getRouterParam(event, 'id')

    try {
        const games = await removeGameFromDB(id)
        return games
    } catch (error) {
        console.error(error)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
