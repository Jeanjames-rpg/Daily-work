import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";


const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const cartItems = await prisma.cartItem.findMany();

    for (const item of cartItems) {
        const variant = await prisma.productVarient.findFirst({
            where: {
                productId: item.productId,
            },
        });

        if (!variant) {
            console.log(
                `No variant found for product ${item.productId}`
            );
            continue;
        }

        await prisma.cartItem.update({
            where: {
                id: item.id,
            },
            data: {
                variantId: variant.id,
            },
        });

        console.log(
            `CartItem ${item.id} → Variant ${variant.id}`
        );
    }

    const orderItems = await prisma.orderItem.findMany();

    for (const item of orderItems) {
        const variant = await prisma.productVarient.findFirst({
            where: {
                productId: item.productId,
            },
        });

        if (!variant) {
            console.log(
                `No variant found for product ${item.productId}`
            );
            continue;
        }

        await prisma.orderItem.update({
            where: {
                id: item.id,
            },
            data: {
                variantId: variant.id,
            },
        });

        console.log(
            `OrderItem ${item.id} →  Variant ${variant.id}`
        );
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });