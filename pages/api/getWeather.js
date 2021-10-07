import express from "express";
import axios from "axios";

require("dotenv").config();

const app = express();

export default app.get("/api/getWeather", (req,res) => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Bhubaneswar`)
    .then(response => {
        res.json({city: response.data.location.name, temp: response.data.current.temp_c});
    })
    .catch(err => {
        res.json({error: err});
    })
})