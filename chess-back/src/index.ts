import connectDB from './loaders/connectDB';
import io from './socket';
import {
    findOneGameInDB,
    updateOneGameInDB,
} from './api/services/game.service';

connectDB();

io.on('connection', (socket) => {
    socket.on('joinGame', ({gameId, userId}) => {
        socket.join(gameId)
        socket.to(gameId).emit('message', `${userId} successfully joined ${gameId} game room`)
        socket.on('message', async (message) => {
            socket.to(gameId).emit('message', message)
            const messages = (await findOneGameInDB(gameId)).messages
            messages.push(message)
            updateOneGameInDB(gameId, {messages})
        })
    })
    socket.on('leaveGame', ({gameId, userId}) => {
        socket.to(gameId).emit('message', `${userId} left ${gameId} game room`)
        socket.leave(gameId)
    })
})
