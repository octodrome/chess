import mongoose from 'mongoose'
const { Schema } = mongoose

export type ApiUser = {
    _id: any
    email: string
    password: string
    games: string[]
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+@.+\..+/,
        },
        password: { type: String, required: true },
        games: [{ type: String, required: true }],
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)
export default User
