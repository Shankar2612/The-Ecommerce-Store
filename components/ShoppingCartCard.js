import React from 'react'
import styles from "../styles/ShoppingCartCard.module.scss"
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

function ShoppingCartCard({cart, onChangeQuantity, onRemoveItem, type}) {

    return (
            <table className={styles.cartCard}>
                <thead>
                    <tr className={styles.header}>
                        <th className={styles.imageHeader}>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        {type ? null : <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                {cart.map((item, index) => {
                    return <tr key={index}>
                            <td>
                                {type ? <img src={item.image} /> : <Link href={`/products/${item.name}`}>
                                    <img src={item.image} />
                                </Link>}
                            </td>
                            <td className={styles.name}>
                                {type ? item.name.substring(0,50) : <Link href={`/products/${item.name}`}>
                                    {item.name.substring(0, 80)}
                                </Link>}
                                ...
                            </td>
                            <td>{item.shortDescription}</td>
                            <td className={styles.price}>₹{discountedPrice(item.price, item.discount)}</td>
                            <td className={styles.quantity}>
                                {type ? item.quantity : <select onChange={(event) => onChangeQuantity(item, event.target.value)} defaultValue={item.quantity} className={styles.select}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>}
                            </td>
                            <td className={styles.totalPrice}>₹{(item.quantity*discountedPrice(item.price, item.discount)).toFixed(2)}</td>
                            {type ? null : <td>
                                <button onClick={() => onRemoveItem(item)}>Remove</button>
                            </td>}
                        </tr>
                })}
                </tbody>
            </table>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartCard);