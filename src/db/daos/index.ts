import { ItemMasterDao } from './t_items';
import { UserMasterDao } from './t_users';

const userMasterDao = new UserMasterDao();
const itemMasterDao = new ItemMasterDao();

export { userMasterDao, itemMasterDao };
