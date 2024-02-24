import { BaseDAO } from './Base';
import { MODELS } from '../../constants';
export class UserMasterDao extends BaseDAO {
  constructor() {
    super(MODELS.t_users);
  }

  createUser(params: Object) {
    return this.create(params);
  }

  updateUser(params, where: { user_id: number }) {
    return this.update(params, { where: where });
  }

  userCount(obj?: { status: string }) {
    const query = {
      distinct: true
    };
    if (obj?.status) {
      query['where'] = { status: obj?.status };
    }

    return this.count(query);
  }

  getUserByUsername(obj: { key: string; value: string | number }) {
    const query = {
      where: {
        [obj.key]: obj.value
      },
      raw: true
    };

    return this.findOne(query);
  }
}
