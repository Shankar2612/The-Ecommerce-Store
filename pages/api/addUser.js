// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongoose from "mongoose";
import express from "express";
import User from "../../models/User";
import data from "../../utils/data";
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

export default app.get("/api/addUser", (req, res) => {
  User.find({}, function(err, docs) {
    if(err) {
      console.log(err); 
    }else {
      if(docs.length === 0) {
        User.insertMany(data.users, function(err, doc) {
          if(err) {
            console.log("Error", err); 
          }else {
            console.log("Data", doc);
          }
        });
        res.send({message: "users added!!"});
        res.redirect("/api/addUser");
      } else {
        res.send(docs);
      }
    }
  });
})