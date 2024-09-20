import { findOneUserByIDInDB } from '../../../db/user.service'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (id) return await findOneUserByIDInDB(id)

    throw createError({
        statusCode: 400,
        statusMessage: 'User id was not provided',
    })
})
