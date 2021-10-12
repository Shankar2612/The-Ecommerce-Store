import React, {useEffect} from 'react'
import Head from "next/head"
import styles from "../../styles/PaymentSuccess.module.scss"
import Order from '../../models/Order'
import docToObj from '../../utils/docToObj'
import Link from "next/link"
import Cookies from 'js-cookie'
import {useRouter} from 'next/router'

export default function PaymentSuccess(props) {
    const router = useRouter();

    useEffect(() => {
        if(!props.orderItems || !Cookies.get("orderID")) {
            router.push("/");
        }
    }, [])

    return (
        <div>
            <Head>
                <title>The Ecom Store: PAYMENT SUCCESS</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <div className={styles.success}>
                <div className={styles.successModal}>
                    <div className={styles.heading}>
                        <img src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="success-icon" />
                        <h1>Payment Successful</h1>
                    </div>
                    <p style={{marginBottom: 18}}>Thank you for shopping with us. Hope you will like the products.</p>
                    <p>Payment ID: <span>{props.orderItems ? props.orderItems.razorpayPaymentID : null}</span></p>
                    <p>Order ID: <span>{props.orderItems ? props.orderItems.orderID : null}</span></p>
                    <p style={{marginBottom: 25}}>Amount Paid: <span>INR. {props.orderItems ? props.orderItems.totalPrice : null}</span></p>
                    <button onClick={() => Cookies.remove("orderID")} type="button">
                        <Link href="/">Continue Shopping</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    console.log(context.query.id);
    const orders = await Order.findOne({orderID : context.query.id}).lean();
    console.log(orders);

    if(orders) {
        return {
            props: {
                orderItems: docToObj(orders)
            }
        }
    } else {
        return {
            props: {
                orderItems: null
            }
        }
    }


    
}
