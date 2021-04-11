require('express-async-errors');
import * as express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import logger from './logger';

export default (app: express.Application) => {
  //Middlewares
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    logger.info('✌️ Morgan enabled');
  }

  logger.info('✌️ Express loaded');
};
