import express from 'express';
import api from '..';
import { auth } from '../../lib/middleware/auth';
import { adminController } from './admin.controller';

const router: express.Router = express.Router({ mergeParams: true });

//* add new grocery item
router.post(
  '/admin/items',
  api.http(auth.validateUser),
  api.http(auth.restric('admin')),
  adminController.addNewItem
);

export const authRouter = router;
