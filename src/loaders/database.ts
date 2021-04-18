import { PrismaClient } from '@prisma/client';

import logger from './logger';
import { errorMessage } from '../constants';

export const prisma = new PrismaClient();

export default async () => {
  try {
    await prisma.$connect();
    logger.info('✌️ Database loaded and connected');
  } catch (error) {
    logger.error(errorMessage.noDatabaseConnection);
  }
};
