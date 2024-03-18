import bcrypt from 'bcrypt'
import { createUserInDB } from '../db/user.service'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const hashedPassword = await bcrypt.hash(body.password, 10)
    const user = await createUserInDB({
        email: body.email,
        password: hashedPassword,
    })
    return user
})
