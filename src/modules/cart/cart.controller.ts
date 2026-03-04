import { type Response } from 'express';
import { CartService } from './cart.service.js';

export class CartController {
    static async getMyCart(req: any, res: Response) {
        const cart = await CartService.getCart(req.user.id);
        res.json(cart);
    }

    static async addItem(req: any, res: Response) {
        // Double check: are you sending 'productId' in Postman?
        console.log("Body Received from Postman:", req.body); 
        const { productId, quantity } = req.body; 

        if (!productId) {
            return res.status(400).json({ success: false, message: "productId is required", receivedBody: req.body });
        }

        try {
            const item = await CartService.addToCart(req.user.id, productId, Number(quantity));
            res.status(200).json({ success: true, data: item });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}