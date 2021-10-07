// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongoose from "mongoose";
import express from "express";
import User from "../../models/User";
import data from "../../utils/data";

const app = express();

mongoose.connect("mongodb://localhost:27017/webshopDB", {useNewUrlParser: true});

export default app.get("/api/addUser", async (req, res) => {
  await User.find({}, async function(err, docs) {
    if(err) {
      console.log(err); 
    }else {
      if(docs.length === 0) {
        await User.insertMany(data.users, function(err, doc) {
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