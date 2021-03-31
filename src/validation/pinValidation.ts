import * as Joi from 'joi';

import { IUser } from '../interfaces';

const validatePin = (user: Partial<IUser>) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    pin: Joi.string().min(4).max(4).required(),
    modified: Joi.required(),
  });

  return schema.validate(user);
};

export default validatePin;
