import React from 'react'
import styles from "../styles/MyOrderCard.module.scss"
import {discountedPrice} from "../utils/discountedPrice"
import Link from "next/link"

export default function MyOrderCard(props) {

    return (
        <div className={styles.orderCard}>
            <div className={styles.orderDelivered}>
                <img src="https://cdn-icons-png.flaticon.com/128/1524/1524855.png" alt="order-icon" />
                <div className={styles.deliveryStatus}>
                    <h3>Not Delivered</h3>
                </div>
            </div>
            <hr />
            <div className={styles.orderDetails}>
                <div className={styles.orderDetailsImgInfo}>
                    <img src={props.order.image} alt="product-img" />
                    <div className={styles.details}>
                        <h3><Link href={`/products/${props.order.name}`}>{props.order.name}</Link></h3>
                        <p style={{marginBottom: 5}}>{props.order.shortDescription}.</p>
                    </div>
                </div>
                <p>Order ID: <span>{props.orderItem.orderID}</span></p>
                <p>Amount Paid: <span>₹ {(Number(discountedPrice(props.order.price, props.order.discount)) + 200).toFixed(2)}</span></p>
                <p style={{marginBottom: 0}}>Payment Status: <span>{props.orderItem.isPaid ? "Paid" : "Not Paid"}</span></p>
            </div>
        </div>
    )
}

