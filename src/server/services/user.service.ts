import moment from 'moment';
import { CONSTANT_CONFIG } from '../../config/CONSTANT_CONFIG';
import { itemMasterDao, orderItemsDao, ordersDao, userMasterDao } from '../../db/daos';
import { MESSAGES } from '../utils/constants/messages';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';

class UserService {
  async orderItems(object, options) {
    const { items } = object;
    const sub = options.locals?.auth.sub;

    const user = await userMasterDao.isValidUser(sub);
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }

    // Calculate total price
    let totalPrice = 0;
    const arrayOrderItem = [];
    for (const item of items) {
      const { id, quantity } = item;
      const groceryItem = await itemMasterDao.findByPk(id);
      if (!groceryItem) {
        throw new Error(MESSAGES.ERROR.ITEM_NOT_FOUND);
      }
      totalPrice += groceryItem.price * quantity;
      // Create order items
      const orderItem = {
        item_id: id,
        quantity: quantity,
        subtotal: groceryItem.price * quantity
      };
      arrayOrderItem.push(orderItem);
    }

    // Create order
    const order = {
      user_id: sub,
      order_date: Date.now(),
      total_amount: totalPrice
    };
    const orderDetails = await ordersDao.createOrder(order);
    // add order id
    const updatedArrayOrderItem = arrayOrderItem.map(obj => ({
      ...obj,
      ['order_id']: orderDetails?.id
    }));
    // insert in order table
    await orderItemsDao.bulkCreate(updatedArrayOrderItem);

    return { message: MESSAGES.SUCCESS.ORDER_CREATED };
  }
}

export const userService = new UserService();
