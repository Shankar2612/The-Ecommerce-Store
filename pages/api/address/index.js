import express from "express";
import mongoose from "mongoose";
import Address from "../../../models/Address";

const app = express();

mongoose.connect("mongodb://localhost:27017/webshopDB", {useNewUrlParser: true});

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