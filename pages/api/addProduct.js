// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongoose from "mongoose";
import express from "express";
import Product from "../../models/Product";
import data from "../../utils/data";

const app = express();

mongoose.connect("mongodb://localhost:27017/webshopDB", {useNewUrlParser: true});

export default app.get("/api/addProduct", async (req, res) => {
  await Product.find({}, async function(err, docs) {
    if(err) {
      console.log(err); 
    }else {
      if(docs.length === 0) {
        await Product.insertMany(data.products, function(err, doc) {
          if(err) {
            console.log("Error", err); 
          }else {
            console.log("Data", doc);
          }
        });
        res.send({message: "added data"});
        res.redirect("/api/addProduct");
      } else {
        res.send(docs);
      }
    }
  });
})


