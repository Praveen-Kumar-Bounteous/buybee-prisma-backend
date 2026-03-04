import { type Response } from 'express';
import { UserService } from './user.service.js';

export class UserController {
    static async getMe(req: any, res: Response) {
        const user = await UserService.getProfile(req.user.id);
        res.json(user);
    }

    static async addAddress(req: any, res: Response) {
        const address = await UserService.addAddress(req.user.id, req.body);
        res.status(201).json(address);
    }
}