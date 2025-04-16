import prisma from "../../lib/client.js";

export default async function createNewProduct(req, res) {
  try {
    // Extract the product's data from the request body
    const {
      name,
      slug,
      brand,
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

    // Check if the required fields are provided
    if (
      !name ||
      !slug ||
      !brand ||
      !description ||
      !price ||
      !inStock ||
      !images ||
      !storage ||
      !color ||
      !network ||
      !simType ||
      !condition
    ) {
      return res.status(400).json({
        message: "Missing required product data",
      });
    }

    // Create a new product in the database
    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        brand,
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
      },
    });

    // Return the created product as a response
    res.status(201).json(newProduct);
  } catch (e) {
    console.log("Could not create new product: ", e);
    res.status(500).send("Could not create new product");
  }
}