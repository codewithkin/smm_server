import { PrismaClient } from "@prisma/client";
import faker from "faker"; // for generating random customer and product data

const prisma = new PrismaClient();

async function seed() {
  // Create 50 customers
  const customers = [];
  for (let i = 0; i < 50; i++) {
    const customer = await prisma.customer.create({
      data: {
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        spent: faker.datatype.number({ min: 100, max: 5000 }),
        customerSince: faker.date.past(),
        lastPurchase: faker.date.recent(),
        purchases: [],
      },
    });
    customers.push(customer);
  }

  console.log("50 customers have been seeded!");

  // Create 50 products
  const products = [];
  const imageURLs = [
    "https://picsum.photos/200/300", // Placeholder image from Lorem Picsum
    "https://picsum.photos/200/301", // Another example image
    "https://picsum.photos/200/302", // And so on...
  ];

  for (let i = 0; i < 50; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        slug: faker.lorem.slug(),
        brand: faker.company.companyName(),
        description: faker.lorem.paragraph(),
        price: parseFloat(faker.commerce.price()),
        discountPrice:
          Math.random() < 0.5 ? parseFloat(faker.commerce.price()) : null,
        inStock: faker.datatype.number({ min: 10, max: 100 }),
        images: [imageURLs[i % imageURLs.length]], // Use an array with random image links
        storage: faker.random.arrayElement(["128GB", "256GB", "512GB"]),
        color: faker.commerce.color(),
        network: faker.random.arrayElement(["5G", "4G", "LTE"]),
        simType: faker.random.arrayElement(["Dual SIM", "Single SIM"]),
        condition: faker.random.arrayElement(["New", "Refurbished"]),
        isFeatured: Math.random() < 0.3, // 30% chance to be featured
        isNewArrival: Math.random() < 0.5, // 50% chance to be a new arrival
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    products.push(product);
  }

  console.log("50 products have been seeded!");

  // Create 50 purchases for customers
  for (let i = 0; i < 50; i++) {
    const customer = customers[i];
    const product = products[i % 50]; // Random product from list

    await prisma.purchase.create({
      data: {
        customerId: customer.id,
        productId: product.id,
        quantity: faker.datatype.number({ min: 1, max: 5 }),
        price: product.price,
      },
    });
  }

  console.log("50 purchases have been made!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
