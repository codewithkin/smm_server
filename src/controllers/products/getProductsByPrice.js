export default async function getProductsByPrice (req, res) {
    try {
         // get the products' category from query params
         const {min, max} = req.query;

         if(!min || !max) {
            res.status(500).json({
                message: "prices were not provided"
            })
         }

         // Get products within the price range
         // pass

         // Return the products

         res.json({
            message: "Yep, things seem mighty fine here..."
         })
    } catch (e) {
        console.log("An error occured while fetching products: ", e);

        res.json({
            message: "An error occured while fetching products"
        })
    }
}