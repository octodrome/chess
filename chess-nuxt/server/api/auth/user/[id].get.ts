import { findOneUserByIDInDB } from '../../../db/user.service'

export default defineEventHandler(async (event) => {
    console.log('GET api/user/:id')
    const id = getRouterParam(event, 'id')

    const user = await findOneUserByIDInDB(id)
    return user
})
