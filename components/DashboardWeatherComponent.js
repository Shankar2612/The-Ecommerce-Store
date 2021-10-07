import React, {useEffect, useState} from 'react'
import styles from "../styles/DashboardWeatherComponent.module.scss"
import axios from "axios"

export default function DashboardWeatherComponent() {
    const [city, setCity] = useState("");
    const [temp, setTemp] = useState("");

    useEffect(() => {
        axios.get("/api/getWeather")
        .then(res => {
            if(res.data.error) {
                console.log(res.data.error);
            } else {
                setCity(res.data.city);
                setTemp(res.data.temp);
            }
        })
        .catch(err => {
            console.log(err);
            setCity("");
            setTemp("");
        })
    }, [])

    return (
        <div className={styles.dashboardWeather}>
            <img src="https://cdn-icons-png.flaticon.com/128/414/414825.png" alt="cloud-icon" />
            <div className={styles.weatherDetails}>
                <p className={styles.degree}>{temp}℃</p>
                <p>{city}</p>
            </div>
        </div>
    )
}