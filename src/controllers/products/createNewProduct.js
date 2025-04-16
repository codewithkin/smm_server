import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createNewProduct (req, res) {
    try {
        // Get the product's data from the request body
        const data = req.body;

        if(!data) {
            res.status(500).send("Data not provided, you messed up Kin");
        }

        // Remove the product image's background

        // Upload the product image without bg to cloudflare r1
        // const uploaded=

        // Create a new product in the db (with the product image without a bg)

        // Return the product
        res.send("All is well that ends well...");
    } catch (e) {
        console.log("Could not create new product: ", e);

        res.status(500).send("Could not create new product")
    }
}