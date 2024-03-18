import bcrypt from 'bcrypt'
import { createUserInDB } from '../db/user.service'

export default defineEventHandler(async (event) => {
    console.log('POST /api/user/signup')
    const body = await readBody(event)

    try {
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const user = await createUserInDB({
            email: body.email,
            password: hashedPassword,
        })
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
