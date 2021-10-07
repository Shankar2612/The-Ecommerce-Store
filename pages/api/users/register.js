import express from "express";
import User from "../../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import { signToken } from "../../../utils/auth";

const app = express();

mongoose.connect("mongodb://localhost:27017/webshopDB", {useNewUrlParser: true});

export default app.post("/api/users/register", async (req,res) => {
    User.create({name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password), admin: false})
    .then(user => {
        if(user) {
            res.send({message: "User registered successfully!!"});
        } else {
            res.send({message: "Something went wrong!! Please try again"});
        }
    })
    .catch(err => {
        res.send({message: "The Email is already in use please use a different one."});
    })
})