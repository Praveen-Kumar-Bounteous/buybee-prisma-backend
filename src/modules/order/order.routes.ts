import { Router } from 'express';
import { OrderController } from './order.controller.js';
import { protect, authorize } from '../../middlewares/auth.middleware.js';

const router = Router();

// Endpoint: POST /api/v1/orders/checkout
router.post('/checkout', protect, authorize('BUYER'), OrderController.placeOrder);

// Endpoint: GET /api/v1/orders/history
router.get('/history', protect, authorize('BUYER'), OrderController.getMyOrders);

export default router;