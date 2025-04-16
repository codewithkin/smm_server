import prisma from "../../lib/client.js";

export default async function getAllProducts(req, res) {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      skip: Number(offset),
      take: Number(limit),
    });

    const total = await prisma.product.count();

    res.json({ products, total });
  } catch (e) {
    console.error("Error fetching all products:", e);
    res.status(500).json({ message: "An error occurred" });
  }
}