import { prisma } from '../../lib/prisma.js';

export class OrderService {
    static async checkout(userId: string, orderData: any) {
        return await prisma.$transaction(async (tx) => {
            // 1. Get cart items
            const cart = await tx.cart.findUnique({
                where: { user_id: userId },
                include: { items: { include: { product: true } } }
            });

            if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

            const totalPrice = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

            // 2. Create Order
            const order = await tx.order.create({
                data: {
                    user_id: userId,
                    total_price: totalPrice,
                    payment_method: orderData.payment_method,
                    shipping_address: orderData.shipping_address,
                    expected_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
                    items: {
                        create: cart.items.map(item => ({
                            product_id: item.product_id,
                            quantity: item.quantity,
                            price: item.product.price // Store historical price
                        }))
                    }
                }
            });

            // 3. Clear Cart
            await tx.cartItem.deleteMany({ where: { cart_id: cart.id } });

            return order;
        });
    }

    static async getHistory(userId: string) {
        return await prisma.order.findMany({
            where: { user_id: userId },
            include: { items: { include: { product: true } } },
            orderBy: { created_at: 'desc' }
        });
    }
}