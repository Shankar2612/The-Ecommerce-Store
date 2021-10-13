import mongoose from "mongoose";
require("dotenv").config();

let connection = {};

async function connect() {
    if(connection.isConnected) {
        console.log("Already Connected to MongoDB");
        return;
    } else if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected  === 1) {
            console.log("Using Previous Connection");
            return;
        } else {
            await mongoose.disconnect();
        }
    } 
    else {
        const db = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:true,
            useUnifiedTopology: true
        });
        console.log("New Connection");
        connection.isConnected = db.connections[0].readyState;
    }
}

async function disconnect() {
    if(connection.isConnected) {
        if(process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log("Not Disconnected");
        }
    }
}

const db = {connect, disconnect};
export default db;