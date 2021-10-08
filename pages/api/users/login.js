import express from "express";
import User from "../../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";
require("dotenv").config();

const app = express();


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

export default app.post("/api/users/login", async (req,res) => {
    const user = await User.findOne({email: req.body.email});

    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = signToken(user);
        res.status(200).send({token: token, user: user, message: "Successfully logged in."});
    } else if(!user){
        res.send({message: "Seems like you don't have an account. Please Register first."});
    } else if(!bcrypt.compareSync(req.body.password, user.password)) {
        res.send({message: "Wrong User Credentials!!"});
    }
})