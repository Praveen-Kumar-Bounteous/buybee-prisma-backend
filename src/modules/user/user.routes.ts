import { Router } from 'express';
import { UserController } from './user.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/me', protect, UserController.getMe);
router.post('/address', protect, UserController.addAddress);

export default router;