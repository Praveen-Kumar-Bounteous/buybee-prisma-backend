import { Router } from 'express';
import { FeaturedController } from './featured.controller.js';
import { protect, authorize } from '../../middlewares/auth.middleware.js';

const router = Router();

// Public: Anyone can see featured products
router.get('/', FeaturedController.getFeatured);

// Protected: Only Sellers can promote a product to featured
router.post('/:id', protect, authorize('SELLER'), FeaturedController.addFeatured);

export default router;