import React from 'react'
import styles from "../styles/PriceDetailsCard.module.scss"
import {connect} from "react-redux"
// import {discountedPrice} from "../utils/discountedPrice"

const mapStateToProps = (state) => {
    return {
        cart: state.addCartReducer.cart
    }
}

function PriceDetailsCard(props) {

    const getTotalPrice = () => {
        let totalPrice = 0;
        props.cart.map(cartItem => {
            totalPrice = totalPrice + (cartItem.price * Number(cartItem.quantity));
        })

        return totalPrice;
    }

    const getDiscountedPrice = () => {
        let totalDiscountedPrice = 0;
        
        props.cart.map(cartItem => {
            totalDiscountedPrice = totalDiscountedPrice + (Number(cartItem.price * (cartItem.discount/100)) * Number(cartItem.quantity));
        });

        return totalDiscountedPrice.toFixed(2);
    }

    return (
        <div className={styles.priceDetails}>
            <h5>Price Details <span>({props.cart.length === 1 ? props.cart.length + " item" : props.cart.length + " items"})</span></h5>
            <div className={styles.totalPrice}>
                <p>Total MRP</p>
                <p>₹{getTotalPrice()}</p>
            </div>
            <div className={styles.totalPrice}>
                <p>Discount on MRP</p>
                <p className={styles.discount}>-₹{getDiscountedPrice()}</p>
            </div>
            <div className={styles.totalPrice}>
                <p>Convenience Fee</p>
                <p>₹200</p>
            </div>
            <hr />
            <div className={styles.allTotalPrice}>
                <p>Total Amount</p>
                <p>₹{getTotalPrice() + 200 -getDiscountedPrice()}</p>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(PriceDetailsCard);