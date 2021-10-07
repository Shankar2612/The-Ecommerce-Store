import express from "express";
import User from "../../models/User";
import Address from "../../models/Address";

const app = express();

export default app.post("/api/deleteUser", async (req,res) => {
    
    const userInfo = await User.deleteOne({name: req.body.name});
    const addressInfo = await Address.deleteOne({name: req.body.name});

    if(userInfo.deletedCount && addressInfo.deletedCount) {
        res.json({message: "User and all it's related addresses deleted successfully!!"});
    } else if(!addressInfo.deletedCount) {
        res.json({message: "User deleted successfully!!"});
    } else {
        res.json({message: "Something went wrong!! Please try again later"});
    }
})