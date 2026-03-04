import { Router } from 'express';
import { CartController } from './cart.controller.js';
import { protect, authorize } from '../../middlewares/auth.middleware.js';

const router = Router();

// Endpoint: GET /api/v1/cart
router.get('/', protect, authorize('BUYER'), CartController.getMyCart);

// Endpoint: POST /api/v1/cart/add
router.post('/add', protect, authorize('BUYER'), CartController.addItem);

export default router;