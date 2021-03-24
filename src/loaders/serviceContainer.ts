import logger from './logger';
import { prisma } from './database';

export default {
  prisma: prisma,
  logger: logger,
};
