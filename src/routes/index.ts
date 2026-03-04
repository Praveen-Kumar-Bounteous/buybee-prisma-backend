import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import userRoutes from '../modules/user/user.routes.js';
import productRoutes from '../modules/product/product.routes.js';
import cartRoutes from '../modules/cart/cart.routes.js';
import orderRoutes from '../modules/order/order.routes.js';
import featuredRoutes from '../modules/featured/featured.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/featured', featuredRoutes);

export default router;