import prisma from "../../../prisma/client";

export default async function createNewProduct (req, res) {
    try {
        // Get the product's data from the request body
        const data = req.body;

        if(!data) {
            res.status(500).send("Data not provided, you messed up Kin");
        }

        // Create a new product in the db

        // Return the product
        res.send("All is well that ends well...");
    } catch (e) {
        console.log("Could not create new product: ", e);

        res.status(500).send("Could not create new product")
    }
}