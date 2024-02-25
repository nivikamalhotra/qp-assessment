import express from 'express';
import { authRouter } from './auth.routers';
import { adminRouter } from './admin.routers';
import { userRouter } from './user.routers';
const router: express.Router = express.Router({ mergeParams: true });

router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/auth', authRouter);

export const V1Router = router;
