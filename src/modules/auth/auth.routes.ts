import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh); 
router.post('/logout', protect, AuthController.logout);

export default router;