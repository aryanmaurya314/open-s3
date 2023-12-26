import './config';
import { logger } from './logger';

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception has occurred! Shutting down...', err);
  process.exit(1);
});

import app from './app';
import { db } from './dbContext';

const port = +(process.env.PORT ?? '3000');

db.connect().then(() => {
  app.listen(port, () => {
    logger.info(`App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode.`);
  });
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection has occurred! Shutting down...', err);
  process.exit(1);
});
