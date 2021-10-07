import express from "express";
import Product from "../../models/Product";

const app = express();

export default app.post("/api/searchProduct", async (req,res) => {
    await Product.createIndexes({name: "text"});

    const product = await Product.find({$text: {$search: req.body.productName}}).lean();

    if(product.length !== 0) {
        res.json({message: "Product Found", data: product});
    } else {
        res.json({message: "No Product Found", data: []});
    }
})