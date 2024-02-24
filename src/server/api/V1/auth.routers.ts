import express from 'express';
import api from '..';
import { authController } from './auth.controller';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/login', api.http(authController.login));
router.post('/signup', api.http(authController.signup));

export const authRouter = router;
