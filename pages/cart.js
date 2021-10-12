import React from 'react'
import {connect} from "react-redux"
import Head from "next/head"
import styles from "../styles/CartScreen.module.scss"
import ShoppingCartCard from '../components/ShoppingCartCard'
import ShoppingCartCardTwo from '../components/ShoppingCartCardTwo'
import { discountedPrice } from '../utils/discountedPrice'
import Link from "next/link"

const mapStateToProps = (state) => {
    return {
        cart: state.addCartReducer.cart
    }
}

function CartScreen(props) {
    
    const getTotalPrice = () => {
        let total = 0;
        props.cart.map(item => {
            total = Number(total) + Number((discountedPrice(item.price, item.discount) * item.quantity).toFixed(2));
        })
        return total;
    }

    return (
        <div>
            <Head>
                <title>The Ecom Store | Shopping Cart</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <div className={styles.cartContainer}>
                <div className={styles.cartDetails}>
                    <h1>Shopping Cart:</h1>
                    <hr />
                    {props.cart.length === 0 
                    ? <div className={styles.emptyCart}>
                        <p>Your Cart is currently empty.</p>
                        <Link href="/">Continue Shopping</Link>
                    </div> 
                    : <div className={styles.shoppingCart}>
                        <ShoppingCartCard cartItem={props.cart} />
                        <ShoppingCartCardTwo cartItem={props.cart} />
                    </div>}
                    <hr />
                    <div className={styles.subtotal}>
                        <p>Subtotal ({props.cart.length === 1 ? props.cart.length + " item" : props.cart.length + " items"}): <span>₹{getTotalPrice().toFixed(2)}</span></p>
                    </div>
                    <div className={styles.subtotal}>
                        {props.cart.length === 0 ? null : <Link href="/shipping">Proceed to checkout</Link>}
                    </div>
                </div>
                <div className={styles.cartSubtotal}>
                    <p>Subtotal ({props.cart.length === 1 ? props.cart.length + " item" : props.cart.length + " items"}): <span>₹{getTotalPrice().toFixed(2)}</span></p>
                    {props.cart.length === 0 ? null : <Link href="/shipping">Proceed to checkout</Link>}
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(CartScreen);