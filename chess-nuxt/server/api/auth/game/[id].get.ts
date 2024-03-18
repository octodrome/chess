import { findOneGameInDB } from '../../../db/game.service'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const game = await findOneGameInDB(id)
    return game
})
