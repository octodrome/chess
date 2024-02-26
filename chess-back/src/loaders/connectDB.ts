import mongoose, { ConnectOptions } from 'mongoose';
import config from '../config';

export default function connectDB() {
  mongoose
    .connect(
      `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}/${config.mongoDbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      } as ConnectOptions
    )
    .then(() => console.log('✅[database]: Successfully connected to DB'))
    .catch((err) => console.log('❌[database]: Failed to connect to DB', err));
}
