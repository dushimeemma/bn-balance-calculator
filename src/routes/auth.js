import { Router } from 'express';

import Auth from '../controllers/auth';
import asyncHandler from '../middlewares/errors/async_handler';
import { SignupSchema, LoginSchema } from '../middlewares/validations/auth';

const router = Router();
const auth = new Auth();

router
  .post('/signup', SignupSchema, asyncHandler(auth.create))
  .post('/login', LoginSchema, asyncHandler(auth.login));

export default router;
