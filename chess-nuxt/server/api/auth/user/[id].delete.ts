import { removeUserFromDB } from '../../../db/user.service'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const users = await removeUserFromDB(id)
    return users
})
