import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt.utils.js'; 

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json({ message: "User created successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        
        const user = await AuthService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const at = generateAccessToken({ id: user.id, role: user.role });
        const rt = generateRefreshToken({ id: user.id });

        await AuthService.updateRT(user.id, rt);

        res.cookie('refreshToken', rt, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        res.cookie('accessToken', at, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        res.json({ 
            accessToken: at, 
            refreshToken: rt, 
            role: user.role,
            user: { id: user.id, name: user.name, email: user.email }
        });
    }

    // Added Refresh Logic: Exchanges a valid RT cookie for a new AT
    static async refresh(req: Request, res: Response) {
        const rt = req.cookies.refreshToken;
        if (!rt) return res.status(401).json({ message: "Unauthorized" });

        const decoded = verifyRefreshToken(rt) as any;
        if (!decoded) return res.status(403).json({ message: "Forbidden" });

        const user = await AuthService.findByRT(rt);
        if (!user) return res.status(403).json({ message: "Invalid session" });

        const at = generateAccessToken({ id: user.id, role: user.role });
        res.json({ accessToken: at });
    }

    static async logout(req: any, res: Response) {
        await AuthService.updateRT(req.user.id, null);
        res.clearCookie('refreshToken');
        res.json({ message: "Logged out successfully" });
    }
}