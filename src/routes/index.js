import { Router } from 'express';

import auth from './auth';
import balance from './balance';

const router = Router();

router.use('/auth', auth);
router.use('/balance', balance);

export default router;
