import express from "express";
import Product from "../../models/Product";

const app = express();

export default app.post("/api/addProducts", async (req,res) => {
    console.log("here");
    const product = await Product.insertMany({
        name: req.body.name,
        category: req.body.category,
        subCategory: req.body.subCategory,
        rating: 4,
        price: req.body.price,
        discount: req.body.discount,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        image: req.body.image,
        colors: req.body.colors,
        brand: req.body.brand,
        sizes: req.body.sizes,
        stock: req.body.stock
    });

    if(product) {
        res.json({message: "Successfully added Product!!"});
    } else {
        res.json({message: "Something went wrong!! Please try again later."});
    }
})