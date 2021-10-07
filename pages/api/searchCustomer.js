import express from "express";
import User from "../../models/User";
import Address from "../../models/Address";

const app = express();

export default app.post("/api/searchCustomer", async (req,res) => {

    const user = await User.find({name: req.body.customerName}).lean();
    const address = await Address.find({name: req.body.customerName}).lean();
    console.log(user);
    console.log(address);

    if(user.length !== 0 && address.length !== 0) {
        res.json({message: "User and Address Found", customerData: user, addressData: address});
    } else if (user.length === 0){
        res.json({message: "No User Found", customerData: [], addressData: []});
    } else {
        res.json({message: "No Address Found", customerData: user, addressData: []});
    }
})