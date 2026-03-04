import { prisma } from '../../lib/prisma.js';

export class UserService {
    static async getProfile(userId: string) {
        return await prisma.user.findUnique({
            where: { id: userId },
            include: { addresses: true }
        });
    }

    static async addAddress(userId: string, addressData: any) {
        return await prisma.address.create({
            data: { ...addressData, userId }
        });
    }
}