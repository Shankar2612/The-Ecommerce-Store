import React from 'react'
import styles from "../styles/OrderStatus.module.scss"
import Link from "next/link"

export default function OrderStatus(props) {
    return (
        <div className={styles.orderStatus}>
            <Link href="/">
                LOGO.
            </Link>
            <div className={styles.status}>
                <p>LOGIN</p>
                <span>-------------</span>
                {props.status === "Shipping Address" ? <p className={styles.shippingStatusActive}>SHIPPING ADDRESS</p> : <p>SHIPPING ADDRESS</p>}
                <span>-------------</span>
                {props.status === "Payment" ? <p className={styles.shippingStatusActive}>PAYMENT</p> : <p>PAYMENT</p>}
                {/* <span>-------------</span>
                {props.status === "Place Order" ? <p className={styles.shippingStatusActive}>PLACE ORDER</p> : <p>PLACE ORDER</p>} */}
                {/* <div className={styles.statusTag}>
                    <img src="https://cdn-icons-png.flaticon.com/128/5087/5087592.png" alt="user-icon" />
                </div> */}
            </div>
        </div>
    )
}
