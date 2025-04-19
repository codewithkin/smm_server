// controllers/dashboard/getAllData.js
import prisma from "../../lib/client.js";

export default async function getAllData(req, res) {
  try {
    const [
      customers,
      notifications,
      checkouts,
      users,
      checkoutItems,
      products,
      purchases,
    ] = await Promise.all([
      prisma.customer.findMany(),
      prisma.notification.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.checkout.findMany({ include: { items: true } }),
      prisma.user.findMany(),
      prisma.checkoutItem.findMany(),
      prisma.product.findMany(),
      prisma.purchase.findMany(),
    ]);

    res.status(200).json({
      customers,
      notifications,
      checkouts,
      users,
      checkoutItems,
      products,
      purchases,
    });
  } catch (e) {
    console.error("Error fetching dashboard data:", e);
    res.status(500).json({ message: "Failed to fetch dashboard data." });
  }
}
