import express from "express";
import Product from "../../models/Product";

const app = express();

export default app.post("/api/changeStock", (req, res) => {
    req.body.cart.map(async cartItem => {
        let result = await Product.updateOne({name: cartItem.name}, {stock: Number(cartItem.stock - Number(cartItem.quantity))});
        res.json({result: result});
    });
})