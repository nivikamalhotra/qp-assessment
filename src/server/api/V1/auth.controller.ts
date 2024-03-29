import { authService } from '../../services/auth.service';
import { GlobalUtils } from '../../utils';
import { joiValidate } from '../../utils/joi/joi-validate';
import { ApiValidator } from '../../utils/validation';
import { responses as ModifiedResponse } from '../../utils/responses';

const controller = {
  login: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.signIn);

      const userRes = await authService.signIn(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  signup: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.signup);

      const userRes = await authService.signup(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  }
};

export const authController = controller;
