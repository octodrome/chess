import { removeGameFromDB } from '../../../db/game.service'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const games = await removeGameFromDB(id)
    return games
})
