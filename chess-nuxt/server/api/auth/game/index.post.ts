import { createGameInDB } from '../../../db/game.service'

// @TODO use zod for body validation ?
export default defineEventHandler(async (event) => {
    console.log('POST /api/game')
    const body = await readBody(event)

    try {
        const game = await createGameInDB({
            creator: body.creator,
            guest: body.guest,
            hasToPlay: body.hasToPlay,
            moves: body.moves,
        })
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
