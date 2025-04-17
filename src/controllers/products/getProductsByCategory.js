import prisma from "../../lib/client.js";

export default async function getProductsByCategory(req, res) {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    if (!category) {
      return res.status(400).json({ message: "Category was not provided" });
    }

    const products = await prisma.product.findMany({
      where: {
        category: {
          equals: category,
          mode: "insensitive",
        },
      },
      skip: offset,
      take: limit,
    });

    const total = await prisma.product.count({
      where: {
        category: {
          equals: category,
          mode: "insensitive",
        },
      },
    });

    return res.json({ products, total });

    return res
      .status(404)
      .json({ message: "No products found in this category" });
  } catch (e) {
    console.error("Error fetching products by category:", e);
    res.status(500).json({
      message: "An error occurred while fetching products by category",
    });
  }
}
