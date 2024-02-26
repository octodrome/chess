import http from 'http'
import app from './app'
import config from './config';
import logs from './logs/console';

const server = http.createServer(app)
server.listen(config.apiPort, () => console.log(logs.server.success));

export default server;
