import express from 'express';

import endpoints from '../api/endpoints';
import { home } from '../api';
import { masterAuth } from '../middlewares';
import logger from './logger';

export default (app: express.Application) => {
  app.use(endpoints.home, masterAuth, home);

  logger.info('✌️ Routes Loaded');
};
