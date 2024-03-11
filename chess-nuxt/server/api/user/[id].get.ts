import { findOneUserByIDInDB } from '../../db/user.service'

export default defineEventHandler(async (event) => {
    console.log('GET api/user/:id')
    const id = getRouterParam(event, 'id')

    try {
        const user = await findOneUserByIDInDB(id)
        return user
    } catch (error) {
        console.error(error)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
