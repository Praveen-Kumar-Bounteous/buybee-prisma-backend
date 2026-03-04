import type { Request, Response } from 'express';
import { ProductService } from './product.service.js';

export class ProductController {
    static async create(req: any, res: Response) {
        const product = await ProductService.create(req.body, req.user.id);
        res.status(201).json(product);
    }

    static async getAll(req: Request, res: Response) {
        const products = await ProductService.getAll();
        res.json(products);
    }

    static async delete(req: any, res: Response) {
        const result = await ProductService.delete(req.params.id, req.user.id);

        if(result.count == 0){
            return res.status(404).json({
                success: false,
                message: "Product Not Found or Already been deleted"
            })
        }
        res.status(200).json({
            success: true, 
            message: "Product Removed! - But Retained in Order History of users if purchased"
        });
    }

    static async update(req: any, res: Response) {
        const { id } = req.params;
        const sellerId = req.user.id;
        const updateData = req.body;

        // Validation: If no fields are provided in the body, return an error
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide at least one field to update (title, price, etc.)" 
            });
        }

        try {
            const result = await ProductService.update(id, sellerId, updateData);

            if (result.count === 0) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Product not found or unauthorized" 
                });
            }

            res.status(200).json({ 
                success: true, 
                message: "Product updated successfully" 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }
}