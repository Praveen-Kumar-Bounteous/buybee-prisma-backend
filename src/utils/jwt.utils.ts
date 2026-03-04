import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
        return null;
    }
};