import prisma from "../../lib/client.js";

export default async function getProductById(req, res) {
  try {
    // get the product's id from query params
    const { id } = req.query;

    if (!id) {
      res.status(500).json({
        message: "Category was not provided",
      });
    }

    // Find a product matching the id
    // const productExists =

    // If the product exists...
    // if(product) {
    // ...return it
    // }

    // Otherwise
    // Return a not found message
    // res.status(404).json({
    //     message: "Product not found"
    // })

    res.send("Yep, everything seems okay here ");
  } catch (e) {
    console.log("An error occured while fetching product by id: ", e);

    res.status(500).send("An error occured while fetching product by id");
  }
}
