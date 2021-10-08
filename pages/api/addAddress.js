import express from "express";
import mongoose from "mongoose";
import Address from "../../models/Address";
import data from "../../utils/data";

const app = express();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

export default app.get("/api/addAddress", async (req, res) => {
    await Address.find({}, async function(err, docs) {
        if(err) {
          console.log(err); 
        }else {
          if(docs.length === 0) {
            await Address.insertMany(data.address, function(err, doc) {
              if(err) {
                console.log("Error", err); 
              }else {
                console.log("Data", doc);
              }
            });
            res.send({message: "address added!!"});
            res.redirect("/api/addAddress");
          } else {
            res.send(docs);
          }
        }
    });
})