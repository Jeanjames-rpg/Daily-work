import { PrismaClient } from "@/app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config"


const connectionString = process.env.DATABASE_URL! ;

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const password = await bcrypt.hash("Owner@123", 10);

    const Owner = await prisma.user.upsert({
        where: {
            email: "owner@example.com",
        },
        update: {
            role: "OWNER",
            password,
        },
        create: {
            name: "Store Owner",
            email: "owner@example.com",
            password,
            role: "OWNER",
        },
    });

    console.log("✅ Owner account created/updated");
    console.log("Email:", Owner.email);
    console.log("Role:", Owner.role);
}

main()
  .catch((error) => {
    console.error("❌ Failed to create owner:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });