import mongoose from 'mongoose'
const { Schema } = mongoose

export type ApiMessage = {
    from: string
    content: string
}

const messageSchema = new Schema(
    {
        from: { type: String },
        content: { type: String },
    },
    { timestamps: true }
)

export type ApiGame = {
    _id: string
    creator: string
    guest: string
    hasToPlay: string
    moves: string[]
    messages: ApiMessage[]
    createdAt: Date
    updatedAt: Date
}

const gameSchema = new Schema(
    {
        creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        guest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        hasToPlay: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        moves: [{ type: String }],
        messages: [messageSchema],
    },
    { timestamps: true }
)

const Game = mongoose.model('Game', gameSchema)
export default Game
