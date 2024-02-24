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

  isValidUser(id: number) {
    const query = {
      attributes: { exclude: ['password'] },
      where: {
        id: id
      },
      raw: true
    };

    return this.findOne(query);
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
