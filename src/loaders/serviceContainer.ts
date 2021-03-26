import logger from './logger';
import { prisma } from './database';
import { userService } from '../services';
import { IServiceInterface } from 'interfaces';

const userServiceDepenedencies: IServiceInterface = {
  prisma,
  logger,
};

const userServiceInstance = userService(userServiceDepenedencies);

export const container = {
  prisma: prisma,
  logger: logger,
  userService: userServiceInstance,
};
