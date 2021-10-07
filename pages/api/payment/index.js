import express from "express";
import Razorpay from "razorpay";
import uniqid from 'uniqid';
require("dotenv").config();

const app = express();

export default app.post("/api/payment", (req, res) => {
    console.log((req.body.amount*100).toFixed(0));
    let instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: (req.body.amount * 100).toFixed(0),  // amount in the smallest currency unit
        currency: "INR",
        receipt: uniqid().toString(),
    };

    instance.orders.create(options, function(err, order) {
        if(err) {
            res.json({message: "Failed", error: err});
        }
        else {
            res.json({message: "Success", order: order});
        }
    });
})