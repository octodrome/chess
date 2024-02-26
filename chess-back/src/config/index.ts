import dotenv from 'dotenv';
dotenv.config();

export default {
  apiPort: process.env.API_PORT,
  apiHost: process.env.API_HOST,
  apiProtocol: process.env.API_PROTOCOL,
  mongoPassword: process.env.MONGO_PWD,
  mongoUser: process.env.MONGO_USER,
  mongoHost: process.env.MONGO_HOST,
  mongoDbName: process.env.MONGO_DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
};
