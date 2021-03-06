import { PrismaClient, Prisma } from '@prisma/client';
import * as winston from 'winston';

interface IServiceInterface {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  logger: winston.Logger;
}

export default IServiceInterface;
