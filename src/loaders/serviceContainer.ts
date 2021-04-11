import logger from './logger';
import { prisma } from './database';
import { userService, authService, mailService } from '../services';
import { IServiceInterface } from '../interfaces';

const userServiceDepenedencies: IServiceInterface = {
  prisma,
  logger,
};

const userServiceInstance = userService(userServiceDepenedencies);
const authServiceInstance = authService(userServiceDepenedencies);
const mailServiceInstance = mailService();

export const container = {
  prisma: prisma,
  logger: logger,
  userService: userServiceInstance,
  authService: authServiceInstance,
  mailService: mailServiceInstance,
};
