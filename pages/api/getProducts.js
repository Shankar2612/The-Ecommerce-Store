import express from "express"
import Product from '../../models/Product'
import mongoose from "mongoose"

const app = express();

mongoose.connect(process.env.MONGODB_URL, 
    {
      useNewUrlParser:true
  })

export default app.get("/api/getProducts", async (req, res) => {
    const products = await Product.find({}).lean();
    res.send(products);
})