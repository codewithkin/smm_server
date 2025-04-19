import prisma from "../../lib/client.js";

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID and delete it
    const product = await prisma.product.delete({
      where: { id }, // Assuming `id` is an integer, adjust if it's a string
    });

    // If product is not found, return an error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send success response
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // Handle any errors (e.g., database issues)
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
