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
      createdAt,
      updatedAt,
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
      !condition ||
      !createdAt ||
      !updatedAt
    ) {
      return res.status(400).json({
        message: "Missing required product data",
      });
    }

    // Assuming the images are an array of URLs, for the sake of example, we will proceed with storing them
    // You can also add logic here to handle background removal or upload to Cloudflare R1

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
        createdAt,
        updatedAt,
      },
    });

    // Return the created product as a response
    res.status(201).json(newProduct);
  } catch (e) {
    console.log("Could not create new product: ", e);

    res.status(500).send("Could not create new product");
  }
}
