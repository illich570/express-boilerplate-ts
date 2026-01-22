import { pinoHttp } from 'pino-http';

import { createServer } from './app.js';
import { AppError } from './infrastructure/app-error.js';
import logger from './infrastructure/logger/pino-logger.js';
import { errorHandler } from './presentation/middleware/error-handler.js';
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
  throw new AppError('La vaina se complico', 400);
  response.send({ code: 200, message: 'todo ok' });
});

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server alive! Running on PORT: ${port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
