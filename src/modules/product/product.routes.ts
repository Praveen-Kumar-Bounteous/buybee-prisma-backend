import { Router } from 'express';
import { ProductController } from './product.controller.js';
import { protect, authorize } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', protect, authorize('SELLER'), ProductController.create);
router.delete('/:id', protect, authorize('SELLER'), ProductController.delete);
router.put('/:id', protect, authorize('SELLER'), ProductController.update);

export default router;