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
  },
  deleteItem: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateParams(options.params, joiValidate.itemId);

      const userRes = await adminService.deleteItem(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  getItemById: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateParams(options.params, joiValidate.itemId);

      const userRes = await adminService.getItemById(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },

  updateItemById: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateParams(options.params, joiValidate.itemId);
      await ApiValidator.validateBody(object, joiValidate.updateItem);

      const userRes = await adminService.updateItemById(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },

  manageInventory: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateParams(options.params, joiValidate.itemId);
      await ApiValidator.validateBody(object, joiValidate.manageInventory);

      const userRes = await adminService.manageInventory(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  }
};

export const adminController = controller;
