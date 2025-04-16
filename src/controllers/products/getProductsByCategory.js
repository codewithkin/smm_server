import prisma from "../../lib/client.js";

export default async function getProductsByCategory(req, res) {
  try {
    // Get the product category from query params
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        message: "Category was not provided",
      });
    }

    // Find products matching the category
    const products = await prisma.product.findMany({
      where: {
        category: {
          equals: category,
          mode: "insensitive", // case-insensitive match
        },
      },
    });

    // If products exist, return them
    if (products.length > 0) {
      return res.json(products);
    }

    // Otherwise, return a not found message
    return res.status(404).json({
      message: "No products found in this category",
    });
  } catch (e) {
    console.log("An error occurred while fetching products by category:", e);

    res
      .status(500)
      .send("An error occurred while fetching products by category");
  }
}
