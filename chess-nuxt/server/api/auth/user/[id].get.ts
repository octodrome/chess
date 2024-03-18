import { findOneUserByIDInDB } from '../../../db/user.service'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const user = await findOneUserByIDInDB(id)
    return user
})
