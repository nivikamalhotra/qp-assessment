import express from 'express';
import api from '..';
import { auth } from '../../lib/middleware/auth';
import { adminController } from './admin.controller';

const router: express.Router = express.Router({ mergeParams: true });

router
  .route('/items')
  .post(
    api.http(auth.validateUser),
    api.http(auth.checkRole('admin')),
    api.http(adminController.addNewItem)
  )
  .get(
    api.http(auth.validateUser),
    api.http(auth.checkRole('admin')),
    api.http(adminController.getItems)
  );

router
  .route('/items/:id')
  .delete(
    api.http(auth.validateUser),
    api.http(auth.checkRole('admin')),
    api.http(adminController.deleteItem)
  )
  .get(
    api.http(auth.validateUser),
    api.http(auth.checkRole('admin')),
    api.http(adminController.getItemById)
  )
  .put(
    api.http(auth.validateUser),
    api.http(auth.checkRole('admin')),
    api.http(adminController.updateItemById)
  );

router
  .route('/items/:id/inventory')
  .patch(
    api.http(auth.validateUser),
    api.http(auth.checkRole('admin')),
    api.http(adminController.manageInventory)
  );
export const adminRouter = router;
