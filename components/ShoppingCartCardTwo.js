import React from 'react'
import styles from "../styles/ShoppingCartCardTwo.module.scss"
import {discountedPrice} from '../utils/discountedPrice'
import Link from "next/link"

import { setQuantity, removeCart } from '../utils/actions'
import {connect} from "react-redux"

const mapStateToProps = state => {
    console.log(state.cart);
    return {
        cart: state.addCartReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeQuantity: (product, quantity) => {
            dispatch(setQuantity(product, quantity));
        },

        onRemoveItem: (product) => {
            dispatch(removeCart(product));
        },
    }
}

function ShoppingCartCardTwo({cart, onChangeQuantity, onRemoveItem, type}) {

    return (
            <div className={styles.cartCardTwo}>
                {cart.map((item,index) => {
                    return <div key={index} className={styles.cardContainer}>
                        {type 
                        ? <img src={item.image} alt="product-img" /> 
                        : <Link href={`/products/${item.name}`}>
                            <img src={item.image} alt="product-img" />
                        </Link>}
                        <div className={styles.cardInfo}>
                            {type 
                            ? <h3>{item.name.substring(0,50)}...</h3> 
                            : <Link href={`/products/${item.name}`}>
                                    <h3>{item.name.substring(0, 80)}...</h3>
                            </Link>}
                            <p>{item.shortDescription}</p>
                            <div className={styles.priceContainer}>
                                <p>Price: <span>₹{discountedPrice(item.price, item.discount)}</span></p>
                                <div className={styles.quantity}>
                                    <p>Qty:</p>
                                    {type 
                                    ? <span style={{marginLeft: 5}}>{item.quantity}</span> 
                                    : <select onChange={(event) => onChangeQuantity(item, event.target.value)} defaultValue={item.quantity} className={styles.select}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>}
                                </div>
                            </div>
                            {type 
                                ? null 
                                : <button onClick={() => onRemoveItem(item)}>Remove</button>
                            }
                        </div>
                    </div>
                })}
            </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartCardTwo);