import React, {useState} from 'react'
import Navbar from '../../components/Navbar' 
import Head from "next/head"
import styles from "../../styles/Product.module.scss"
import starCounter from '../../utils/StarsCounter'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import BlackScreen from '../../components/BlackScreen'
import SignInReminder from '../../components/SignInReminder'
import docToObj from '../../utils/docToObj'
import Product from '../../models/Product'
import Address from '../../models/Address'
import PriceCard from '../../components/PriceCard'
import {discountedPrice} from "../../utils/discountedPrice"
import cookie from "cookie"

import {setCart} from "../../utils/actions"
import {connect} from "react-redux"

const mapStateToProps = (state) => {
  return {
    cart: state.addCartReducer.cart,
    userInfo: state.userAuthReducer.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (product, quantity) => {
        const cartItem = {...product, quantity: quantity};
        dispatch(setCart(cartItem));
    }
  }
}


function ProductScreen(props) {

    const [quantity, setQuantity] = useState(1);
    const [sideBar, setSideBar] = useState("none");
    const {product, cart, onAddToCart} = props;
    const [blackScreen, setBlackScreen] = useState("none");

    const handleSidebar = () => {
        if(sideBar === "none") {
        setSideBar("sidebar");
        setBlackScreen("enable");
        } else {
        setSideBar("none");
        setBlackScreen("none");
        }
    }

    if(!product) {
        return <div>Product Not Found!</div>
    }

    return (
        <>
        <div>
            <Head>
                <title>React Webshop: {product.name}</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <Navbar handleSidebar={handleSidebar} cart={props.cart} />
            <div className={styles.container}>
                <img className={styles.productImage} src={product.image} alt={product.name} />
                <div className={styles.productInfo}>
                    <h1>{product.name}</h1>
                    <div className={styles.starContainer}>
                        {starCounter(product.rating)}
                    </div>
                    <hr className={styles.line} />
                    <div className={styles.priceContainer}>
                        <p>₹ {discountedPrice(product.price, product.discount)}</p>
                        <div className={styles.oldPrice}>
                            <p>₹ {product.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className={styles.savedPrice}>
                        <p>You saved:</p>
                        <p className={styles.priceSaved}>₹ {(product.price - discountedPrice(product.price, product.discount)).toFixed(2)}</p>
                    </div>
                    <p className={styles.colorHeading}>Colors:</p>
                    <div className={styles.colorContainer}>
                        {product.colors.map((color, index) => {
                            return <div key={index} style={{backgroundColor: color}} className={styles.colorPalette}></div>
                        })}
                    </div>
                    <p style={{marginBottom: 20}} className={styles.colorHeading}>In Stock: <span style={{width: "fit-content", fontWeight:500, padding: "3px 10px", backgroundColor: "black", color: "white", borderRadius: 5, textTransform: "none"}}>{props.product.stock === 0 ? "Out of Stock" : props.product.stock}</span></p>
                    <p className={styles.colorHeading}>Quantity:</p>
                    <select onChange={(event) => setQuantity(event.target.value)} className={styles.select}>
                        <option default value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <div className={styles.cartAndWishlist}>
                        <button onClick={() => onAddToCart(product, quantity)} type="button">Add to Cart</button>
                        <button className={styles.wishlist} type="button">Add to Wishlist</button>
                    </div>
                    <hr className={styles.line} />
                    <p className={styles.colorHeading}>Desription:</p>
                    <ul className={styles.productDescription}>
                        {product.longDescription.map((description, index) => {
                            return <li key={index}>{description}</li>
                        })}
                    </ul>
                </div>
                <PriceCard address={props.address} quantity={quantity} product={product} price={discountedPrice(product.price, product.discount)} />
            </div>
            {props.userInfo ? null : <SignInReminder />}
        </div>
        <Footer />
        <Sidebar handleSidebar={handleSidebar} sidebarOpen={sideBar} />
        {blackScreen === "none" ? null : <BlackScreen />}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);

export async function getServerSideProps(context) {
    const {params} = context;
    const {slug} = params;

    const product = await Product.findOne({ name: slug }).lean();
    let address = null;
    if(cookie.parse(context.req.headers.cookie).userInfo) {
        address = await Address.findOne({ name: JSON.parse(cookie.parse(context.req.headers.cookie).userInfo).user.name }).lean();
    }

    if(product) {
        if(address) {
            return {
                props: {
                    product: docToObj(product),
                    address: docToObj(address)
                },
            };
        } else {
            return {
                props: {
                    product: docToObj(product),
                    address: null
                },
            };
        }
    } else {
        if(address) {
            return {
                props: {
                    product: null,
                    address: docToObj(address)
                },
            };
        } else {
            return {
                props: {
                    product: null,
                    address: null
                },
            };
        }
    } 
}