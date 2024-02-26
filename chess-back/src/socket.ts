import server from './server';
import { Server } from 'socket.io';

const socketServer = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

export default socketServer;
