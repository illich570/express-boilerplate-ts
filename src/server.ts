import { pinoHttp } from 'pino-http';

import { createServer } from './app.js';
import logger from './logger.js';
const port = Number(process.env.PORT) || 3000;
const app = createServer();
app.use(
  pinoHttp({
    logger,
  }),
);

app.get('/', (request, response) => {
  request.log.info('Hello!');
  response.send('hello world');
});

app.get('/health', (request, response) => {
  response.send({ code: 200, message: 'OK!' });
});

app.get('/testing', (request, response) => {
  response.send({ code: 200, message: 'todo ok' });
});

const server = app.listen(port, () => {
  console.log(`Server alive! Running on PORT: ${port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
