import React from 'react'
import styles from "../styles/PriceCard.module.scss"
// import Link from "next/link"
import { connect } from 'react-redux'
import { setCart } from '../utils/actions'
import router, { useRouter } from 'next/router'

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
      onAddToCart: (product, quantity) => {
        const cartItem = {...product, quantity: quantity};
        dispatch(setCart(cartItem));
      }
    }
}

function PriceCard(props) {
    console.log(props.address);
    const router = useRouter();

    return (
        <div className={styles.priceCardContainer}>
            <div className={styles.price}>
                <p>₹ {(props.price*props.quantity).toFixed(2)}</p>
            </div>
            <div className={styles.address}>
                <img src="https://img.icons8.com/material-rounded/24/000000/marker.png"/>
                {props.address ? <p>{props.address.address}, Dist- {props.address.district}, Pin- {props.address.pinCode}, {props.address.state}, {props.address.country}</p> : <p>No Address Provided!</p>}
            </div>
            <hr />
            <div className={styles.buyNow}>
                <button onClick={() => {props.onAddToCart(props.product, 1); router.push("/shipping")}}>Buy Now</button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceCard);