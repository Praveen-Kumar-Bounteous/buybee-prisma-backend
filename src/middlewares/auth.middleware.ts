import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Not Authorized" });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
};

export const authorize = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Role not allowed" });
        }
        next();
    };
};