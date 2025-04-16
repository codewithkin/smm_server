import prisma from "../../lib/client.js";

export default async function getProductsByPrice(req, res) {
  try {
    const { min, max } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    if (!min || !max) {
      return res.status(400).json({ message: "Both min and max prices must be provided" });
    }

    const minPrice = parseFloat(min);
    const maxPrice = parseFloat(max);

    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({ message: "Invalid price values" });
    }

    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      skip: offset,
      take: limit,
    });

    if (products.length > 0) return res.json(products);

    return res.status(404).json({ message: "No products found in this price range" });
  } catch (e) {
    console.error("Error fetching products by price:", e);
    res.status(500).json({ message: "An error occurred while fetching products by price" });
  }
}
