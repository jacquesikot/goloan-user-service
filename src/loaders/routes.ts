import * as express from 'express';

import endpoints from '../api/endpoints';
import { home, users, auth } from '../api';
// import { masterAuth } from '../middlewares';
import logger from './logger';

export default (app: express.Application) => {
  app.use(endpoints.home, home);
  app.use(endpoints.users, users);
  app.use(endpoints.auth, auth);

  logger.info('✌️ Routes Loaded');
};
