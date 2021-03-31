import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import { IUser, IServiceInterface } from '../interfaces';

const authService = ({ logger }: IServiceInterface) => {
  const validatePassword = async (givenPassword: string, gottenPassword: string) => {
    try {
      const validPassword = await bcrypt.compare(givenPassword, gottenPassword);
      return validPassword;
    } catch (error) {
      logger.error(error);
    }
  };

  const generateAuthToken = async (userData: Partial<IUser>) => {
    try {
      const token = jwt.sign(userData, config.jwtKey);
      return token;
    } catch (error) {
      logger.error(error);
    }
  };

  return {
    validatePassword,
    generateAuthToken,
  };
};

export default authService;
