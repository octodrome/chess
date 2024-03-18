import { findOneGameInDB } from '../../../db/game.service'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (id) return await findOneGameInDB(id)

    throw createError({
        statusCode: 400,
        statusMessage: 'Game id was not provided',
    })
})
