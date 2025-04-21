import prisma from "../../lib/client.js";

export const createManualReceipt = async (req, res) => {
  const { total, items } = req.body;

  if (!total || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const newCheckout = await prisma.checkout.create({
      data: {
        total,
        items: {
          create: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res
      .status(201)
      .json({ message: "Checkout created successfully", id: checkout.id });
  } catch (error) {
    console.error("Error creating manual receipt:", error);
    res.status(500).json({ error: "Failed to create receipt" });
  }
};
