import prisma from "../../lib/client.js";

export const editProduct = async (req, res) => {
  const { id } = req.params; // Get product id from request params
  const {
    name,
    brand,
    category,
    description,
    price,
    discountPrice,
    inStock,
    images,
    storage,
    color,
    network,
    simType,
    condition,
    isFeatured,
    isNewArrival,
  } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        brand,
        category,
        description,
        price,
        discountPrice,
        inStock,
        images,
        storage,
        color,
        network,
        simType,
        condition,
        isFeatured,
        isNewArrival,
        updatedAt: new Date(), // Updating the `updatedAt` field to the current date
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product." });
  }
};
