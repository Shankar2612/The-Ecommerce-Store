import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {useRouter} from "next/router"
import Head from "next/head"
import Link from "next/link"
import OrderStatus from '../components/OrderStatus'
import AddressCard from '../components/AddressCard'
import PriceDetailsCard from '../components/PriceDetailsCard'
import styles from "../styles/ShippingScreen.module.scss"
import Address from '../models/Address'
import docToObj from '../utils/docToObj'
import BlackScreen from '../components/BlackScreen'
import AddAddressModal from '../components/AddAddressModal'
import cookie from 'cookie'
import {removeUserAddress, setUserAddress} from "../utils/actions"
import Cookies from 'js-cookie'

const mapStateToProps = state => {
    return {
        userInfo: state.userAuthReducer.userInfo,
        cart: state.addCartReducer.cart,
        userAddress: state.userAddressReducer.userAddress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAddress: (address) => {
            console.log('here in the dispatching action area');
            dispatch(setUserAddress(address));
        },
        removeAddress: () => {
            dispatch(removeUserAddress());
        }
    }
}

function ShippingScreen(props) {
    console.log(props.cart);
    const [blackScreen, setBlackScreen] = useState("none");
    const [onAddressSelect, setOnAddressSelect] = useState(false);

    const router = useRouter();

    const handleAddressCard = () => {
        if(blackScreen === "none") {
            setBlackScreen("enable");
        } else {
            setBlackScreen("none");
        }
    }

    useEffect(() => {
        if(props.cart.length === 0) {
            router.push("/cart");
        }
    }, [])

    const handleSelectAddress = () => {
        setOnAddressSelect(true);
        Cookies.remove("userAddress");
        props.removeAddress();
        Cookies.set("userAddress", JSON.stringify(props.address));
        props.setAddress(props.address);
    }
    
    return (
        <div>
            <Head>
                <title>React Webshop: ADDRESS</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <div className={styles.shippingScreen}>
                <OrderStatus status={"Shipping Address"} />
                <div className={styles.shippingAddress}>
                    <div className={styles.shippingAddressDetails}>
                        <h1>Select Shipping Address</h1>
                        <p>CURRENT ADDRESS</p>
                        {props.address 
                        ? <div className={styles.availableAddress}>
                            <AddressCard handleSelectAddress={handleSelectAddress} onAddressSelect={onAddressSelect} address={props.address} handleAddressCard={handleAddressCard} />
                            {onAddressSelect ? <button className={styles.continueBtn} type="button">
                                <Link href="/payment">CONTINUE</Link>
                            </button> : null}
                        </div> 
                        : <div className={styles.noAddress}>
                            <p>There are no shipping address linked with this account.</p>
                            <button onClick={() => handleAddressCard()} type="button">ADD SHIPPING ADDRESS</button>
                        </div>}
                    </div>
                    <div className={styles.priceDetails}>
                        <PriceDetailsCard />
                    </div>
                </div>
            </div>
            {blackScreen === "none" ? null : <BlackScreen />}
            {blackScreen === "enable" ? <AddAddressModal setAddress={props.setAddress} name={props.name} address={props.address} handleAddressCard={handleAddressCard} /> : null}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingScreen);

export async function getServerSideProps(context) {
    const cookies = cookie.parse(context.req.headers.cookie);

    if(cookies.userInfo) {
        const user = JSON.parse(cookie.parse(context.req.headers.cookie).userInfo);
        const addressReceived = await Address.findOne({name: user.user.name}).lean();

        if(addressReceived) {
            return {
                props: {
                    address: docToObj(addressReceived),
                    name: user.user.name
                }
            }
        } else {
            return {
                props: {
                    address: null,
                    name: user.user.name
                }
            }
        }
    } else {
        return {
            props: {
                address: null,
                name: null
            }
        }
    }
}