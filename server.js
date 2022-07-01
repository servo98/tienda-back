import http from 'http';
import api from './api/api.js';
import config from './api/config/index.js';

const port = config.server.port;

const server = http.createServer(api);

const onListening = () => {
  console.log('Servidor escuchando en puerto', port);
};

const onError = () => {
  console.error('Ha ocurrido un error en el servidor');
};

server.on('listening', onListening);
server.on('error', onError);

server.listen(port);
