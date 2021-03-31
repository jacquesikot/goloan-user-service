import * as bcrypt from 'bcrypt';
import { IUser, IServiceInterface } from '../interfaces';

const userService = ({ prisma, logger }: IServiceInterface) => {
  const hashValue = async (value: string) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedValue = await bcrypt.hash(value, salt);
      return hashedValue;
    } catch (error) {
      logger.error(error);
    }
  };

  const validatePassword = async (givenPassword: string, userPassword: string) => {
    try {
      const validPassword = await bcrypt.compare(givenPassword, userPassword);
      if (!validPassword) return false;
      return true;
    } catch (error) {
      logger.error(error);
    }
  };

  const createUser = async (user: IUser) => {
    const { first_name, last_name, phone_number, email, gender, user_type, password } = user;

    const safePassword = (await hashValue(password))?.toString();
    // Sort out user types
    const userType = user_type ? user_type : 'standard';

    try {
      const user = prisma.users.create({
        data: {
          first_name,
          last_name,
          phone_number,
          email,
          password: safePassword,
          gender,
          user_type: userType,
          created_at: new Date().toISOString(),
        },
      });

      return user;
    } catch (error) {
      logger.error(error);
    }
  };

  const checkIfUserExists = async (user_email: string) => {
    try {
      const foundUser = await prisma.users.findUnique({
        where: {
          email: user_email,
        },
      });

      if (!foundUser) return false;
      return true;
    } catch (error) {
      logger.error(error);
    }
  };

  const findUserByEmail = async (user_email: string) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: user_email,
        },
      });
      if (user) return user;
      return false;
    } catch (error) {
      logger.error(error);
    }
  };

  const getUserById = async (user_id: string) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: user_id,
        },
      });
      if (user) return user;
    } catch (error) {
      logger.error(error);
    }
  };

  const modifiedValue = (modified: string) => {
    if (modified !== null) {
      const value = Number(modified) + 1;
      return value.toString();
    } else return '1';
  };

  const updateKYC = async ({ id, gender, year_of_birth, relationship_status, bvn, modified }: Partial<IUser>) => {
    try {
      const updatedUser = await prisma.users.update({
        where: {
          id,
        },
        data: {
          bvn,
          gender,
          year_of_birth,
          relationship_status,
          updated_at: new Date().toISOString(),
          modified: modifiedValue(modified),
        },
      });
      return updatedUser;
    } catch (error) {
      logger.error(error);
    }
  };

  const addPin = async ({ id, pin, modified }: Partial<IUser>) => {
    const safePin = await hashValue(pin);
    try {
      const updatedUser = await prisma.users.update({
        where: {
          id,
        },
        data: {
          pin: safePin,
          updated_at: new Date().toISOString(),
          modified: modifiedValue(modified),
        },
      });
      return updatedUser;
    } catch (error) {
      logger.error(error);
    }
  };

  return {
    hashValue,
    validatePassword,
    createUser,
    checkIfUserExists,
    findUserByEmail,
    getUserById,
    updateKYC,
    addPin,
  };
};

export default userService;
