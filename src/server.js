import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
// import * as movieServices from './services/movies.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const port = Number(env('PORT', 3000));

export const startServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use(router);

  app.use(errorHandler);
  app.use('*', notFoundHandler);

  app.listen(port, () => {
    console.log('Server running on port 3000');
  });
};
