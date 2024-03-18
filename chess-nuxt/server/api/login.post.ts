import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findOneUserByEmailInDB } from '../db/user.service'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const user = await findOneUserByEmailInDB(body.email)
    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found',
        })
    }
    const validation = await bcrypt.compare(body.password, user.password)
    if (!validation) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Wrong password',
        })
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
})
