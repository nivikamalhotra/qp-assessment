import { itemMasterDao, userMasterDao } from '../../db/daos';
import { connectToRedis } from '../utils/cache';
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

  async getItems(object, options) {
    const sub = options.locals?.auth.sub;
    const query = options.query;
    const limit: number = query?.limit ? parseInt(query.limit) : 50;
    const start: number = query?.start ? parseInt(query.start) : 0;

    const user = await userMasterDao.isValidUser(sub);
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }
    const role = user.role;
    const items = await itemMasterDao.getItems({ limit, start, role });

    return { message: MESSAGES.SUCCESS.ITEM_FETCHED, data: items };
    /*
    // Generate a unique cache key based on the query parameters
    const cacheKey = `items_${sub}_${limit}_${start}`;
    const client = await connectToRedis();

    try {
      return new Promise((resolve, reject) => {
        client.get(cacheKey, async (err, cachedData) => {
          if (err) {
            reject(new Error(err));
            return;
          }
          if (cachedData) {
            resolve(JSON.parse(cachedData));
          }
          try {
            const items = await itemMasterDao.getItems({ limit, start, role });
            // Cache the data with an expiration time (e.g., 1 hour)
            client.setex(
              cacheKey,
              3600,
              JSON.stringify({ message: MESSAGES.SUCCESS.ITEM_FETCHED, data: items })
            );
            resolve({ message: MESSAGES.SUCCESS.ITEM_FETCHED, data: items });
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (err) {
      return err;
    }
    */
  }

  async deleteItem(object, options) {
    const sub = options.locals?.auth.sub;
    const id = options.params.id;

    const user = await userMasterDao.isValidUser(sub);
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }

    await itemMasterDao.delete({ id: id });
    return { message: MESSAGES.SUCCESS.ITEM_DELETED };
  }

  async getItemById(object, options) {
    const sub = options.locals?.auth.sub;
    const id = options.params.id;

    const user = await userMasterDao.isValidUser(sub);
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }

    const details = await itemMasterDao.findOne({ where: { id: id } });
    return { message: MESSAGES.SUCCESS.ITEM_FETCHED, data: details };
  }

  async updateItemById(object, options) {
    const sub = options.locals?.auth.sub;
    const id = options.params.id;
    const body = object;

    const user = await userMasterDao.isValidUser(sub);
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }

    await itemMasterDao.updateItem(body, { id: id });
    return { message: MESSAGES.SUCCESS.ITEM_UPDATED };
  }

  async manageInventory(object, options) {
    const sub = options.locals?.auth.sub;
    const id = options.params.id;
    const { quantity, operation } = object;

    const user = await userMasterDao.isValidUser(sub);
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }

    const validId = await itemMasterDao.findByPk(id);
    if (!validId) {
      throw new Error(MESSAGES.ERROR.ITEM_NOT_FOUND);
    }

    let inventory = validId.inventory;
    // if inventory sold than we have to minus the quantity from the already inventory count
    if (operation == 'sold') {
      if (validId.inventory < quantity) {
        throw new Error(`Not enough stock for ${validId.name}.`);
      }
      inventory -= quantity;
    } else if (operation == 'fill') inventory += quantity; // we are filling new inventory quantity

    // update new inventory
    await itemMasterDao.updateItem({ inventory: inventory }, { id: id });
    return { message: MESSAGES.SUCCESS.ITEM_UPDATED };
  }
}

export const adminService = new AdminService();
