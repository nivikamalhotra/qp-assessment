import { BaseDAO } from './Base';
import { MODELS } from '../../constants';

export class ItemMasterDao extends BaseDAO {
  constructor() {
    super(MODELS.t_items);
  }

  createItem(params: Object) {
    return this.create(params);
  }

  updateItem(params, where: { user_id: number }) {
    return this.update(params, { where: where });
  }

  isValidItem(id: number) {
    const query = {
      where: {
        id: id
      },
      raw: true
    };

    return this.findOne(query);
  }

  getItems(obj: { limit: number; start: number }) {
    const query = {
      raw: true
    };
    if (obj?.limit) {
      query['limit'] = obj.limit;
      const start = obj?.start || 1;
      query['offset'] = start == 0 ? start : (start - 1) * obj.limit;
    }
    return this.findAndCountAll(query);
  }
}
