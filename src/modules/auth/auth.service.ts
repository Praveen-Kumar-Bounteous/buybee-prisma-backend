import { prisma } from '../../lib/prisma.js';
import bcrypt from 'bcrypt';

export class AuthService {
    static async register(data: any) {
        const hashed = await bcrypt.hash(data.password, 10);
        return await prisma.user.create({
            data: { ...data, password: hashed }
        });
    }

    static async findByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } });
    }

    static async updateRT(userId: string, rt: string | null) {
        await prisma.user.update({ where: { id: userId }, data: { refreshToken: rt } });
    }

    // Added to verify if the token in the cookie matches what is in our DB
    static async findByRT(rt: string) {
        return await prisma.user.findFirst({
            where: { refreshToken: rt }
        });
    }
}