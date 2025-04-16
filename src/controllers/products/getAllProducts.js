import prisma from "../../../prisma/client";

export default async function getAllProducts (req, res) {
    try {
        // Get all products from prisma

        // Return products
        // res.json(products);

        res.json({
            hello: "world"
        });
    } catch (e) {
        console.log("An error occured while getting all products: ", e);

        res.status(500).send({
            message: "An error occured while getting all products"
        })
    }
}   