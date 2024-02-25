import { ItemMasterDao } from './t_items';
import { OrderItemsDao } from './t_order_items';
import { OrdersDao } from './t_orders';
import { UserMasterDao } from './t_users';

const userMasterDao = new UserMasterDao();
const itemMasterDao = new ItemMasterDao();
const ordersDao = new OrdersDao();
const orderItemsDao = new OrderItemsDao();

export { userMasterDao, itemMasterDao, ordersDao, orderItemsDao };
