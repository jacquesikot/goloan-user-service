import * as Joi from 'joi';

const errorMessage = {
  noDatabaseConnection: 'Could not connect to the database',
  internalServerError: 'Oops, something went wrong. Internal Server Error',
  invalidMasterKey: 'Invalid master key',
  noMasterKey: 'Access Forbidden',
  userAlreadyRegistered: 'User with the given ID is already regisered',
  userDoesNotExist: 'User with given ID does not exist',
  invalidAuth: 'Invalid email and password',
  phoneNumberRegistered: 'Phone number already registered',
};

const errorEnvelope = {
  invalidRequest: (error: Joi.ValidationError) => {
    return {
      message: error.details[0].message,
      field: error.details[0].context.label,
      type: error.details[0].type,
    };
  },

  genericError: (message: string, code: number) => {
    return {
      message,
      code,
    };
  },
};

export { errorMessage, errorEnvelope };
