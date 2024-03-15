import { Server } from 'socket.io'

const io = new Server(5000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    socket.on('joinGame', ({ gameId, userId }) => {
        socket.join(gameId)
        socket
            .to(gameId)
            .emit(
                'message',
                `${userId} successfully joined ${gameId} game room`
            )
        socket.on('message', async (message) => {
            socket.to(gameId).emit('message', message)
            const messages = (await findOneGameInDB(gameId)).messages
            messages.push(message)
            updateOneGameInDB(gameId, { messages })
        })
    })
    socket.on('leaveGame', ({ gameId, userId }) => {
        socket.to(gameId).emit('message', `${userId} left ${gameId} game room`)
        socket.leave(gameId)
    })
})

export default defineEventHandler(() => {
    console.log('🚀 Socket server started')
})
