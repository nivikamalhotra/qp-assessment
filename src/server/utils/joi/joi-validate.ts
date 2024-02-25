import { ExtendedJoi as joi } from '../../utils/validation';

export const joiValidate = {
  signIn: joi.object().keys({
    username: joi.string().trim().required(),
    password: joi.string().trim().required()
  }),
  signup: joi.object().keys({
    username: joi.string().trim().required(),
    password: joi.string().trim().required(),
    email: joi.string().trim().email().required(),
    role: joi.string().trim().valid('admin', 'user').required()
  }),
  addItem: joi.object().keys({
    name: joi.string().trim().required(),
    price: joi.number().precision(2).required(),
    inventory: joi.number().required()
  }),
  getItems: joi.object().keys({
    start: joi.number().optional().integer().min(1),
    limit: joi.number().min(1).optional().integer().min(1)
  })
};
