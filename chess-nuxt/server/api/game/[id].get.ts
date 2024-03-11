import { findOneGameInDB } from '../../db/game.service'

export default defineEventHandler(async (event) => {
    console.log('GET api/game/:id')
    const id = getRouterParam(event, 'id')

    try {
        const game = await findOneGameInDB(id)
        return game
    } catch (error) {
        console.error(error)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
