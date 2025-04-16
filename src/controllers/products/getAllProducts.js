import prisma from "../../lib/client.js";

export default async function getAllProducts(req, res) {
  try {
    // Get all products from the database
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return products
    res.json(products);
  } catch (e) {
    console.error("An error occurred while getting all products: ", e);

    res.status(500).send({
      message: "An error occurred while getting all products",
    });
  }
}
