import React from 'react'
import styles from "../styles/ProductCard.module.scss"
import Link from "next/link"
import starCounter from '../utils/StarsCounter'

export default function ProductCard({product, onAddToCart}) {

    const getDiscountedPrice = (price, discount) => {
        return (price - (price * (discount/100))).toFixed(2);
    }

    return (
        <div className={styles.productCard}>
            <div className={styles.productImageHolder}>
                <img className={styles.productImage} src={product.image} />
            </div>
            <h3>
                <Link href={`/products/${product.name}`}>{product.name.substring(0, 50) + "..."}</Link>
            </h3>
            <h4>{product.shortDescription}</h4>
            <div className={styles.starContainer}>
                {starCounter(product.rating)}
            </div>
            <div className={styles.price}>
                <p>₹ {getDiscountedPrice(product.price, product.discount)}</p>
                <p className={styles.oldPrice}>₹ {product.price.toFixed(2)}</p>
            </div>
            <div className={styles.cartAndWishlist}>
                <button onClick={() => onAddToCart(product, 1)} type="button">Add to Cart</button>
                <button className={styles.wishlist} type="button">Add to Wishlist</button>
            </div>
            <p className={styles.discountCard}>{product.discount}%</p>
        </div>
    )
}
