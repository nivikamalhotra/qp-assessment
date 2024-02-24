import { itemMasterDao, userMasterDao } from '../../db/daos';
import { MESSAGES } from '../utils/constants/messages';

class AdminService {
  async addItem(object, options) {
    const sub = options.locals?.auth.sub;
    const { name, price, inventory } = object;

    const user = await userMasterDao.isValidUser(sub);
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }

    await itemMasterDao.createItem({ name: name, price: price, inventory: inventory });
    return { message: MESSAGES.SUCCESS.ITEM_CREATED };
  }
}

export const adminService = new AdminService();
