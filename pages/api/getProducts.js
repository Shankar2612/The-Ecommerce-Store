import express from "express"
import Product from '../../models/Product'

const app = express();

export default app.get("/api/getProducts", async (req, res) => {
    res.json({message: "Hello World"});
})