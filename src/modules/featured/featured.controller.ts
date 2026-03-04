import type { Request, Response } from 'express';
import { FeaturedService } from './featured.service.js';

export class FeaturedController {
    static async getFeatured(req: Request, res: Response) {
        const products = await FeaturedService.getFeatured();
        res.status(200).json({ success: true, data: products });
    }

    static async addFeatured(req: any, res: Response) {
        try {
            // Usually, a seller would want to feature their own product
            const result = await FeaturedService.markAsFeatured(req.params.id);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(400).json({ success: false, message: "Invalid product ID or already featured" });
        }
    }
}