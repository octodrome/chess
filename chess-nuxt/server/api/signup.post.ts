import bcrypt from 'bcrypt'
import { createUserInDB } from '../db/user.service'
import { z } from 'zod'

const userSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, (body) =>
        userSchema.parse(body)
    )

    const hashedPassword = await bcrypt.hash(result.password, 10)
    return await createUserInDB({
        email: result.email,
        password: hashedPassword,
    })
})
