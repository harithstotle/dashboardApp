import * as Joi from '@hapi/joi';
import { IsString, IsEmail } from 'class-validator';

export const EmployeeDtoSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  company: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
});
