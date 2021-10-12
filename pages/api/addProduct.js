import express from "express";
import Product from "../../models/Product";
import data from "../../utils/data";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, 
  {
    useNewUrlParser:true
})

export default app.get("/api/addProduct", (req,res) => {
  Product.find({}, function(err, docs) {
    if(err) {
      console.log(err); 
      res.send({"error": err});
    }else {
      if(docs.length === 0) {
        Product.insertMany(data.products, function(err, doc) {
          if(err) {
            console.log("Error", err); 
          }else {
            console.log("Data", doc);
          }
        });
        res.send({message: "products added!!"});
        res.redirect("/api/addProduct");
      } else {
        res.send(docs);
      }
    }
  });
})