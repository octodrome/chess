import { removeUserFromDB } from '../../db/user.service'

export default defineEventHandler(async (event) => {
    console.log('DELETE api/user/:id')
    const id = getRouterParam(event, 'id')

    try {
        const users = await removeUserFromDB(id)
        return users
    } catch (error) {
        console.error(error)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
