import prisma from "../lib/client.js";

export default async function createCheckout(req, res) {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0 || !total) {
      return res.status(400).json({ message: "Invalid checkout data" });
    }

    // Create checkout and associated items in DB
    const checkout = await prisma.checkout.create({
      data: {
        total,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true, // include items in the response if needed
      },
    });

    return res.status(201).json({
      message: "Checkout created successfully",
      checkout,
    });
  } catch (e) {
    console.error("An error occurred while creating checkout:", e);
    return res.status(500).json({
      message: "An error occurred while creating checkout",
    });
  }
}
