import * as Joi from 'joi';

import { IUser } from '../interfaces';

const validateKyc = (kyc: Partial<IUser>) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    modified: Joi.required(),
    gender: Joi.string().min(4).max(6).required(),
    year_of_birth: Joi.string().required(),
    relationship_status: Joi.string().required(),
    bvn: Joi.string().min(10).max(10).required(),
  });

  return schema.validate(kyc);
};

export default validateKyc;
