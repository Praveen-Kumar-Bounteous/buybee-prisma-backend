import { type Response } from 'express';
import { OrderService } from './order.service.js';

export class OrderController {
    static async placeOrder(req: any, res: Response) {
        try {
            const order = await OrderService.checkout(req.user.id, req.body);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getMyOrders(req: any, res: Response) {
        const history = await OrderService.getHistory(req.user.id);
        res.json(history);
    }
}