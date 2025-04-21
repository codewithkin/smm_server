// /controllers/checkoutController.js
import prisma from "../../lib/client.js";

export const getAllReceipts = async (req, res) => {
  try {
    const checkouts = await prisma.checkout.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });

    const enrichedReceipts = checkouts.map((checkout) => ({
      ...checkout,
      downloadUrl: `https://yourdomain.com/receipts/${checkout.id}/download`, // Update this logic to generate your actual receipt download URL
    }));

    res.status(200).json({
      receipts: enrichedReceipts,
    });
  } catch (error) {
    console.error("Error fetching receipts", error);
    res.status(500).json({ error: "Failed to fetch receipts" });
  }
};