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
    const products = await prisma.product.findMany();

    for (const product of products) {
        const existingVariant = await prisma.productVarient.findFirst({
            where: {
                productId: product.id,
            },
        });

        if (existingVariant) {
            continue;
        }

        await prisma.productVarient.create({
            data: {
                sku: `PRODUCT-${product.id}-DEFAULT`,
                productId: product.id,
                price: product.price,
                stock: product.stock,
            },
        });

        console.log(
            `Created variant for product: ${product.title}`
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