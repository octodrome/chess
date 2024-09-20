import { createGameInDB } from '../../../db/game.service'
import { z } from 'zod'

const gameSchema = z.object({
    creator: z.string(),
    guest: z.string(),
    hasToPlay: z.string(),
    moves: z.array(z.string()),
})

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, (body) =>
        gameSchema.parse(body)
    )

    return await createGameInDB({
        creator: result.creator,
        guest: result.guest,
        hasToPlay: result.hasToPlay,
        moves: result.moves,
    })
})
