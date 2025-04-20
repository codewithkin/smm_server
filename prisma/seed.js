import { faker } from "@faker-js/faker";
import prisma from "../src/lib/client.js";

const CONDITIONS = ["New", "Refurbished"];

async function seedProducts() {
  for (let i = 0; i < 50; i++) {
    const name = faker.commerce.productName();
    const slug = faker.helpers.slugify(name).toLowerCase();

    await prisma.product.create({
      data: {
        name,
        slug,
        brand: faker.company.name(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ min: 100, max: 2000 })),
        discountPrice:
          Math.random() > 0.5
            ? Number(faker.commerce.price({ min: 50, max: 1000 }))
            : null,
        inStock: faker.number.int({ min: 1, max: 100 }),
        images: [
          faker.image.urlLoremFlickr({ category: "technology" }),
          faker.image.urlLoremFlickr({ category: "gadgets" }),
        ],
        storage: `${faker.number.int({ min: 32, max: 512 })}GB`,
        color: faker.color.human(),
        network: faker.helpers.arrayElement(["5G", "4G"]),
        simType: faker.helpers.arrayElement(["Dual SIM", "Single SIM"]),
        condition: faker.helpers.arrayElement(CONDITIONS),
        isFeatured: faker.datatype.boolean(),
        isNewArrival: faker.datatype.boolean(),
      },
    });
  }

  console.log("✅ Seeded 50 products.");
}

async function seedCustomers() {
  for (let i = 0; i < 50; i++) {
    await prisma.customer.create({
      data: {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        spent: faker.number.int({ min: 0, max: 5000 }),
        customerSince: faker.date.past({ years: 5 }),
        lastPurchase: faker.date.recent({ days: 30 }),
      },
    });
  }

  console.log("✅ Seeded 50 customers.");
}

async function main() {
  await seedProducts();
  await seedCustomers();
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
