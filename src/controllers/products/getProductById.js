import prisma from "../../lib/client.js";

export default async function getProductById(req, res) {
  try {
    // Get the product's id from query params
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "Product ID was not provided",
      });
    }

    // Find a product matching the id
    const product = await prisma.product.findUnique({
      where: { id },
    });

    // If the product exists...
    if (product) {
      // ...return it
      return res.json(product);
    }

    // Otherwise return a not found message
    return res.status(404).json({
      message: "Product not found",
    });
  } catch (e) {
    console.error("An error occurred while fetching product by ID:", e);

    res.status(500).send("An error occurred while fetching product by ID");
  }
}