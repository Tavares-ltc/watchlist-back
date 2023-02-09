import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function stars() {
  await prisma.stars.upsert({
    where: { id: 1 },
    update: {},
    create: {
      stars: 1,
    },
  });
  await prisma.stars.upsert({
    where: { id: 2 },
    update: {},
    create: {
      stars: 2,
    },
  });

  await prisma.stars.upsert({
    where: { id: 3 },
    update: {},
    create: {
      stars: 3,
    },
  });

  await prisma.stars.upsert({
    where: { id: 4 },
    update: {},
    create: {
      stars: 4,
    },
  });

  await prisma.stars.upsert({
    where: { id: 5 },
    update: {},
    create: {
      stars: 5,
    },
  });

  console.log("seed: DONE");
}

stars()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
