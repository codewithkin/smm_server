import prisma from "../../lib/client.js";

export default async function getProductsByCategory(req, res) {
  try {
    // get the products' category from query params
    const { category } = req.query;

    if (!category) {
      res.status(500).json({
        message: "Category was not provided",
      });
    }

    // Find a products matching the category
    // const productsExist =

    // If the products exist...
    // if(products) {
    // ...return them
    // }

    // Otherwise
    // Return a not found message
    // res.status(404).json({
    //     message: "Product not found"
    // })

    res.send("Yep, everything seems okay here ");
  } catch (e) {
    console.log("An error occured while fetching products by category: ", e);

    res
      .status(500)
      .send("An error occured while fetching products by category");
  }
}
