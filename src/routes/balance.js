import { Router } from 'express';

import Balance from '../controllers/balance';
import Auth from '../middlewares/auth/auth';
import asyncHandler from '../middlewares/errors/async_handler';
import {
  BalanceSchema,
  AmountPerDaySchema,
} from '../middlewares/validations/balance';

const router = Router();
const balance = new Balance();
const auth = new Auth();

router
  .post('/', auth.verifyToken, BalanceSchema, asyncHandler(balance.create))
  .put(
    '/:id',
    auth.verifyToken,
    AmountPerDaySchema,
    asyncHandler(balance.update)
  )
  .get('/', auth.verifyToken, asyncHandler(balance.getAllBalance))
  .post('/decrease/:id', auth.verifyToken, asyncHandler(balance.decrease));

export default router;
