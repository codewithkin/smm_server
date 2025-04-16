import prisma from "../../lib/client.js";

export default async function getProductsByPrice(req, res) {
  try {
    // Get the price range from query params
    const { min, max } = req.query;

    if (!min || !max) {
      return res.status(400).json({
        message: "Both min and max prices must be provided",
      });
    }

    // Convert min and max to numbers
    const minPrice = parseFloat(min);
    const maxPrice = parseFloat(max);

    // Check if the price values are valid numbers
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({
        message: "Invalid price values",
      });
    }

    // Get products within the price range
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: minPrice, // Greater than or equal to min price
          lte: maxPrice, // Less than or equal to max price
        },
      },
    });

    // If products exist, return them
    if (products.length > 0) {
      return res.json(products);
    }

    // Otherwise, return a not found message
    return res.status(404).json({
      message: "No products found within the specified price range",
    });
  } catch (e) {
    console.log("An error occurred while fetching products by price:", e);

    res.status(500).json({
      message: "An error occurred while fetching products by price",
    });
  }
}
