import { BaseDAO } from './Base';
import { MODELS } from '../../constants';

export class OrderItemsDao extends BaseDAO {
  constructor() {
    super(MODELS.t_order_items);
  }

  createOrder(params: Object) {
    return this.create(params);
  }

  updateOrder(params, where: { id: number }) {
    return this.update(params, { where: where });
  }

  isValidOrder(id: number) {
    const query = {
      where: {
        id: id
      },
      raw: true
    };

    return this.findOne(query);
  }

  getOrders(obj: { limit: number; start: number; role: string }) {
    const query = {
      raw: true
    };
    if (obj?.role != 'admin') {
      query['where'] = {
        status: 'A'
      };
    }
    if (obj?.limit) {
      query['limit'] = obj.limit;
      const start = obj?.start || 1;
      query['offset'] = start == 0 ? start : (start - 1) * obj.limit;
    }
    return this.findAndCountAll(query);
  }
}
