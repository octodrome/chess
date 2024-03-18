import { createGameInDB } from '../../../db/game.service'

// @TODO use zod for body validation ?
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const game = await createGameInDB({
        creator: body.creator,
        guest: body.guest,
        hasToPlay: body.hasToPlay,
        moves: body.moves,
    })
    return game
})
