import { ExtendedJoi as joi } from '../../utils/validation';

export const joiValidate = {
  userApi: {
    signIn: joi.object().keys({
      username: joi.string().trim().required(),
      password: joi.string().trim().required()
    }),
    signup: joi.object().keys({
      username: joi.string().trim().required(),
      password: joi.string().trim().required(),
      email: joi.string().trim().email().required(),
      role: joi.string().trim().valid('admin', 'user').required()
    })
  }
};
