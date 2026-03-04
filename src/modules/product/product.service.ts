import { prisma } from '../../lib/prisma.js';

export class ProductService {
    static async create(data: any, sellerId: string) {
        return await prisma.product.create({
            data: { ...data, seller_id: sellerId }
        });
    }

    static async getAll() {
        return await prisma.product.findMany({ 
            where: { is_deleted: false},
            include: { seller: { select: { name: true } } } 
        });
    }

    static async getById(id: string) {
        return await prisma.product.findUnique({ where: { id } });
    }

    static async update(id: string, sellerId: string, updateData: any) {
        return await prisma.product.updateMany({
            where: {
                id: id,
                seller_id: sellerId
            },
            data: updateData
        });
    }

    static async delete(id: string, sellerId: string) {
        return await prisma.product.updateMany({
            where: { id, seller_id: sellerId },
            data: { is_deleted: true}
        });
    }
}