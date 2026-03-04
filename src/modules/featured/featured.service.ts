import { prisma } from '../../lib/prisma.js';

export class FeaturedService {
    static async getFeatured() {
        return await prisma.featured.findMany({
            include: { product: true }
        });
    }

    static async markAsFeatured(productId: string) {
        return await prisma.featured.upsert({
            where: { product_id: productId },
            update: {},
            create: { product_id: productId }
        });
    }
}