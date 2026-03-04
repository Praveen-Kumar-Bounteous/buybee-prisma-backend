import { prisma } from '../../lib/prisma.js';

export class CartService {
    static async getCart(userId: string) {
        return await prisma.cart.findUnique({
            where: { user_id: userId },
            include: { items: { where: {product: {is_deleted: false}}, 
            include: { product: true } } }
        });
    }

    static async addToCart(userId: string, productId: string, quantity: number) {
        // Check before whether the product is deleted or not
        const product = await prisma.product.findFirst({
            where: {
                id: productId,
                is_deleted: false
            }
        });

        if(!product){
            throw new Error("Product Not Found or unavailable");
        }

        // 1. Ensure the user has a cart
        let cart = await prisma.cart.findUnique({ where: { user_id: userId } });
        
        if (!cart) {
            cart = await prisma.cart.create({ data: { user_id: userId } });
        }

        // 2. Check if product is already in the cart
        const existingItem = await prisma.cartItem.findFirst({
            where: { 
                cart_id: cart.id, 
                product_id: productId
            }
        });

        if (existingItem) {
            // Update quantity if it exists
            return await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity }
            });
        }

        // 3. Create a new item (Fixed syntax)
        // Using 'connect' is safer and more professional in Prisma
        return await prisma.cartItem.create({
            data: {
                quantity: quantity,
                cart: { connect: { id: cart.id } },
                product: { connect: { id: productId } }
            }
        });
    }
}