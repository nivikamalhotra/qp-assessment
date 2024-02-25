import { GlobalUtils } from '../../utils';
import { joiValidate } from '../../utils/joi/joi-validate';
import { ApiValidator } from '../../utils/validation';
import { responses as ModifiedResponse } from '../../utils/responses';
import { adminService } from '../../services/admin.service';

const controller = {
  addNewItem: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.addItem);

      const userRes = await adminService.addItem(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  getItems: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateQuery(options.query, joiValidate.getItems);

      const userRes = await adminService.getItems(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  }
};

export const adminController = controller;
