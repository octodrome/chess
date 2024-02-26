import config from '../config';

export default {
  doc: {
    success: `✅[doc]: Swagger doc updated on : ${config.apiProtocol}://${config.apiHost}:${config.apiPort}/docs/`,
  },
  server: {
    success: `✅[server]: TS Server is running at ${config.apiProtocol}://${config.apiHost}:${config.apiPort}`,
  },
  database: {
    success: '✅[database]: Successfully connected to DB',
    failure: '❌[database]: Failed to connect to DB',
  },
};
