import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './loaders/swagger';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import logs from './logs/console';
import userRoutes from './api/routes/user.routes';
import gameRoutes from './api/routes/game.routes';
import errorHandler from './middlewares/errorHandler';
import cors from './middlewares/cors';

const app: Application = express();

app.use(cors);
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(logs.doc.success);
app.use('/user', userRoutes);
app.use('/game', gameRoutes);
app.use(errorHandler);

export default app;