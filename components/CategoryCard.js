import React from 'react'
import ProductCard from "./ProductCard"
import styles from "../styles/CategoryCard.module.scss"

function CategoryCard(props) {
    return (
        <div className={styles.categoryCard}>
            <h1>{props.category}</h1>
            <div className={styles.productCardContainer}>
                {props.products.map((product,index) => {
                    if(product.category === props.category) {
                        return <ProductCard key={index} onAddToCart={props.onAddToCart} product={product} />
                    }
                })}
            </div>
        </div>
    )
}

export default CategoryCard;