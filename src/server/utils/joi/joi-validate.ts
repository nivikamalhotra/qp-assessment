import { APP_CONSTANT } from '../../../constants';
import { ExtendedJoi as joi } from '../../utils/validation';
const { OBJECT_MISSNG } = APP_CONSTANT.JOI_VALIDATION_TYPE;

export const joiValidate = {
  orderItem: joi.object().keys({
    items: joi.array().items(
      joi.object().keys({
        id: joi.number().required().integer(),
        quantity: joi.number().integer().required()
      })
    )
  }),
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
  }),
  itemId: joi.object().keys({
    id: joi.number().required().integer()
  }),
  manageInventory: joi.object().keys({
    quantity: joi.number().integer().required(),
    operation: joi.string().trim().valid('sold', 'fill').required()
  }),
  updateItem: joi
    .object()
    .keys({
      name: joi.string().trim().optional(),
      price: joi.number().precision(2).optional(),
      status: joi.string().optional().valid('A', 'I')
    })
    .or('name', 'price', 'status')
    .required()
    .messages({
      [OBJECT_MISSNG]: 'object must contain at least one of  [name,price,status] for edit.'
    })
};
