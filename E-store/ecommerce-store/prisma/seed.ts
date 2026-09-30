import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
});

console.log(
    "DATABASE_URL loaded:", !!process.env.DATABASE_URL
);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  // -------------------------
  // CATEGORIES
  // -------------------------

  const electronics = await prisma.category.upsert({
    where: {
      name: "Electronics",
    },
    update: {},
    create: {
      name: "Electronics",
    },
  });

  const clothing = await prisma.category.upsert({
    where: {
      name: "Clothing",
    },
    update: {},
    create: {
      name: "Clothing",
    },
  });

  const accessories = await prisma.category.upsert({
    where: {
      name: "Accessories",
    },
    update: {},
    create: {
      name: "Accessories",
    },
  });

  const shoes = await prisma.category.upsert({
    where: {
      name: "Shoes",
    },
    update: {},
    create: {
      name: "Shoes",
    },
  });

  console.log("✅ Categories created");

  // -------------------------
  // PRODUCT 1 - HEADPHONES
  // -------------------------

  const headphones = await prisma.product.create({
    data: {
      title: "Wireless Headphones",
      description:
        "Premium wireless headphones with noise cancellation and long battery life.",
      price: "4999.00",
      image: "/images/headphones.jpg",
      stock: 50,
      categoryId: electronics.id,

      variants: {
        create: [
          {
            sku: "WH-BLK-001",
            color: "Black",
            storage: null,
            price: "4999.00",
            stock: 25,
            image: "/images/headphones.jpg",
          },
          {
            sku: "WH-WHT-001",
            color: "White",
            storage: null,
            price: "4999.00",
            stock: 25,
            image: "/images/headphones-white.jpg",
          },
        ],
      },
    },
  });

  console.log(`✅ Created ${headphones.title}`);

  // -------------------------
  // PRODUCT 2 - SMARTPHONE
  // -------------------------

  const smartphone = await prisma.product.create({
    data: {
      title: "Smartphone Pro",
      description:
        "Powerful smartphone with a high-resolution display and advanced camera.",
      price: "29999.00",
      image: "/images/phone.jpg",
      stock: 30,
      categoryId: electronics.id,

      variants: {
        create: [
          {
            sku: "SP-BLK-128",
            color: "Black",
            storage: "128GB",
            price: "29999.00",
            stock: 10,
            image: "/images/phone.jpg",
          },
          {
            sku: "SP-BLU-128",
            color: "Blue",
            storage: "128GB",
            price: "29999.00",
            stock: 10,
            image: "/images/phone-blue.jpg",
          },
          {
            sku: "SP-BLK-256",
            color: "Black",
            storage: "256GB",
            price: "34999.00",
            stock: 10,
            image: "/images/phone.jpg",
          },
        ],
      },
    },
  });

  console.log(`✅ Created ${smartphone.title}`);

  // -------------------------
  // PRODUCT 3 - LAPTOP
  // -------------------------

  const laptop = await prisma.product.create({
    data: {
      title: "Developer Laptop",
      description:
        "High-performance laptop suitable for development, productivity and everyday use.",
      price: "64999.00",
      image: "/images/laptop.jpg",
      stock: 20,
      categoryId: electronics.id,

      variants: {
        create: [
          {
            sku: "LAP-GRY-512",
            color: "Grey",
            storage: "512GB",
            price: "64999.00",
            stock: 10,
            image: "/images/laptop.jpg",
          },
          {
            sku: "LAP-SLV-1TB",
            color: "Silver",
            storage: "1TB",
            price: "72999.00",
            stock: 10,
            image: "/images/laptop-silver.jpg",
          },
        ],
      },
    },
  });

  console.log(`✅ Created ${laptop.title}`);

  // -------------------------
  // PRODUCT 4 - T-SHIRT
  // -------------------------

  const tshirt = await prisma.product.create({
    data: {
      title: "Classic T-Shirt",
      description:
        "Comfortable cotton t-shirt suitable for everyday wear.",
      price: "799.00",
      image: "/images/tshirt.jpg",
      stock: 60,
      categoryId: clothing.id,

      variants: {
        create: [
          {
            sku: "TS-BLK-M",
            color: "Black",
            storage: "M",
            price: "799.00",
            stock: 15,
            image: "/images/tshirt.jpg",
          },
          {
            sku: "TS-BLK-L",
            color: "Black",
            storage: "L",
            price: "799.00",
            stock: 15,
            image: "/images/tshirt.jpg",
          },
          {
            sku: "TS-WHT-M",
            color: "White",
            storage: "M",
            price: "799.00",
            stock: 15,
            image: "/images/tshirt-white.jpg",
          },
          {
            sku: "TS-WHT-L",
            color: "White",
            storage: "L",
            price: "799.00",
            stock: 15,
            image: "/images/tshirt-white.jpg",
          },
        ],
      },
    },
  });

  console.log(`✅ Created ${tshirt.title}`);

  // -------------------------
  // PRODUCT 5 - BACKPACK
  // -------------------------

  const backpack = await prisma.product.create({
    data: {
      title: "Travel Backpack",
      description:
        "Durable backpack with multiple compartments for travel and daily use.",
      price: "1999.00",
      image: "/images/backpack.jpg",
      stock: 40,
      categoryId: accessories.id,

      variants: {
        create: [
          {
            sku: "BP-BLK-001",
            color: "Black",
            storage: null,
            price: "1999.00",
            stock: 20,
            image: "/images/backpack.jpg",
          },
          {
            sku: "BP-BLU-001",
            color: "Blue",
            storage: null,
            price: "1999.00",
            stock: 20,
            image: "/images/backpack-blue.jpg",
          },
        ],
      },
    },
  });

  console.log(`✅ Created ${backpack.title}`);

  // -------------------------
  // PRODUCT 6 - RUNNING SHOES
  // -------------------------

  const shoesProduct = await prisma.product.create({
    data: {
      title: "Running Shoes",
      description:
        "Lightweight running shoes designed for comfort and everyday training.",
      price: "2499.00",
      image: "/images/shoes.jpg",
      stock: 40,
      categoryId: shoes.id,

      variants: {
        create: [
          {
            sku: "RS-BLK-8",
            color: "Black",
            storage: "8",
            price: "2499.00",
            stock: 10,
            image: "/images/shoes.jpg",
          },
          {
            sku: "RS-BLK-9",
            color: "Black",
            storage: "9",
            price: "2499.00",
            stock: 10,
            image: "/images/shoes.jpg",
          },
          {
            sku: "RS-BLU-8",
            color: "Blue",
            storage: "8",
            price: "2499.00",
            stock: 10,
            image: "/images/shoes-blue.jpg",
          },
          {
            sku: "RS-BLU-9",
            color: "Blue",
            storage: "9",
            price: "2499.00",
            stock: 10,
            image: "/images/shoes-blue.jpg",
          },
        ],
      },
    },
  });

  console.log(`✅ Created ${shoesProduct.title}`);

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });