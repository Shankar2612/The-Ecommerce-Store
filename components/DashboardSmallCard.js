import React from 'react'
import styles from "../styles/DashboardSmallCard.module.scss"

export default function DashboardSmallCard(props) {
    return (
        <div onClick={() => props.onChangeCardActive(props.name)} className={props.active ? styles.smallCardActive : styles.smallCardInactive}>
            <div className={styles.smallCardDetails}>
                <p>{props.name}</p>
                <h1>{props.name === "Total Sales" || props.name === "Total Revenue" ? "₹" : null}{props.count.toFixed(0)}</h1>
            </div>
            <img src={props.image} alt="orders-icon" />
        </div>
    )
}
