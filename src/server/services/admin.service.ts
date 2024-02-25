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
            const items = await itemMasterDao.getItems({ limit, start });
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
  }
}

export const adminService = new AdminService();
