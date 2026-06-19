import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);
  await prisma.user.upsert({
    where: { email: "admin@shatphoo.com" },
    update: {},
    create: {
      email: "admin@shatphoo.com",
      name: "SHOTPHOO Admin",
      passwordHash,
      roles: [Role.ADMIN, Role.SUPPORT, Role.EDITOR]
    }
  });

  await prisma.internalProject.createMany({
    data: [
      { name: "Reyhan Banoo", slug: "reyhan-banoo", description: "Beauty brand in development.", status: "in development", progress: 72, roadmap: ["Brand", "Commerce", "Launch"], mediaUrls: [] },
      { name: "Owl Magazine", slug: "owl-magazine", description: "Editorial and media property.", status: "prototype", progress: 64, roadmap: ["Editorial system", "Authors", "Launch"], mediaUrls: [] },
      { name: "Rozatia ecosystem", slug: "rozatia-ecosystem", description: "Startup ecosystem connected to SHOTPHOO.", status: "active", progress: 81, roadmap: ["Brands", "Platform", "Growth"], mediaUrls: [] }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
