import express from "express";
import Product from "../../models/Product";

const app = express();

export default app.post("/api/deleteProduct", async (req,res) => {
    // console.log(req.body.productID);
    
    const info = await Product.deleteOne({_id: req.body.productID});

    // console.log(info);

    if(info.deletedCount) {
        res.json({message: "Product deleted successfully!!"});
    } else {
        res.json({message: "Something went wrong!! Please try again"});
    }
})