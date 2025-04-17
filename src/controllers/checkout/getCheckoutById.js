import prisma from "../../lib/client.js";

export const getCheckoutById = async (req, res) => {
  const { id } = req.params;

  try {
    const checkout = await prisma.checkout.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        items: true, // Adjust this if your relation is named differently
      },
    });

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found." });
    }

    res.status(200).json(checkout);
  } catch (error) {
    console.error("Error fetching checkout:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
