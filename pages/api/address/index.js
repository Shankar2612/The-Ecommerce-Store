import express from "express";
import mongoose from "mongoose";
import Address from "../../../models/Address";
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

export default app.post("/api/address", async (req,res) => {
    const {name, mobile, address, locality, pincode, district, state, country, city} = req.body;
    // console.log(name, mobile, address, locality, pincode, district, state, country);

    const receivedAddress = await Address.replaceOne({name: name}, {name: name, mobile: mobile, address: address, locality: locality, pinCode: pincode, district: district, state: state, country: country, city: city} , {upsert: true});
    // console.log(receivedAddress);
    // if(receivedAddress) {
    //     res.send({message: "Received Address!!"});
    // } else {
        
    // }
    res.send({response: receivedAddress});
});