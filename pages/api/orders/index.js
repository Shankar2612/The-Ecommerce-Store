import express from "express";
import Order from "../../../models/Order";
import mongoose from "mongoose";
import { isAuth } from "../../../utils/auth";
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

app.use(isAuth);

export default app.post("/api/orders", async (req,res) => {
    console.log(req.body);

    const newOrder = new Order({
        user: req.user._id,
        orderItems: req.body.orderItems,
        shippingAddress: {
            name: req.body.shippingAddress.name,
            mobile: req.body.shippingAddress.mobile,
            address: req.body.shippingAddress.address,
            locality: req.body.shippingAddress.locality,
            city: req.body.shippingAddress.city,
            pincode: req.body.shippingAddress.pinCode,
            district: req.body.shippingAddress.district,
            state: req.body.shippingAddress.state,
            country: req.body.shippingAddress.country
        },
        orderID: req.body.orderID,
        razorpayPaymentID: req.body.razorpayPaymentID,
        razorpaySignature: req.body.razorpaySignature,
        totalPrice: req.body.totalAmount,
        userName: req.body.userInfo.user.name,
        userEmail: req.body.userInfo.user.email,
        isPaid: true,
        paidAt: new Date()
    })

    const order = await newOrder.save();
    res.status(201).json({message: "success", order: order});
})