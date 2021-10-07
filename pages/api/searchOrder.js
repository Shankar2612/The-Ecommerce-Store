import express from "express";
import Order from "../../models/Order";
import mongoose from "mongoose";

const app = express();

export default app.post("/api/searchOrder", async (req,res) => {

    const order = await Order.find({orderID: req.body.orderID}).lean();
    console.log(order);

    if(order.length !== 0) {
        res.json({message: "Order Found", data: order});
    } else {
        res.json({message: "No Order Found", data: []});
    }
})