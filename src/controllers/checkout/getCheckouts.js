import prisma from "../../lib/client.js";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

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
      downloadUrl: `checkout/${checkout.id}/download`,
    }));

    res.status(200).json({
      receipts: enrichedReceipts,
    });
  } catch (error) {
    console.error("Error fetching receipts", error);
    res.status(500).json({ error: "Failed to fetch receipts" });
  }
};
