import express from 'express';
import api from '..';
import { auth } from '../../lib/middleware/auth';
import { userController } from './user.controller';

const router: express.Router = express.Router({ mergeParams: true });

router
  .route('/items')
  .get(
    api.http(auth.validateUser),
    api.http(auth.checkRole('user')),
    api.http(userController.getItems)
  );

router
  .route('/orders')
  .post(
    api.http(auth.validateUser),
    api.http(auth.checkRole('user')),
    api.http(userController.orders)
  );
  
export const userRouter = router;
