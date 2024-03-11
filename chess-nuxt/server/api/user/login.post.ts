import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findOneUserByEmailInDB } from '../../db/user.service'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    console.log('POST /api/user/login')
    const body = await readBody(event)

    try {
        const user = await findOneUserByEmailInDB(body.email)
        if (!user) {
            event.node.res.statusCode = 404
            return {
                code: 'ERROR',
                message: 'User not found',
            }
        }
        const validation = await bcrypt.compare(body.password, user.password)
        if (!validation) {
            event.node.res.statusCode = 400
            return {
                code: 'ERROR',
                message: 'Wrong password',
            }
        }

        return {
            user: {
                _id: user._id,
                email: user.email,
            },
            token: jwt.sign({ userId: user._id }, config.jwtSecret as string, {
                expiresIn: '24h',
            }),
        }
    } catch (error) {
        console.error(error)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
