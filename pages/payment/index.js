import React, {useEffect, useState} from 'react'
import Head from "next/head"
import OrderStatus from '../../components/OrderStatus'
import styles from "../../styles/PaymentScreen.module.scss"
import {connect} from "react-redux"
import {useRouter} from "next/router"
import PriceDetailsCard from '../../components/PriceDetailsCard'
import AddressCard from '../../components/AddressCard'
import ShoppingCartCard from '../../components/ShoppingCartCard'
import ShoppingCartCardTwo from '../../components/ShoppingCartCardTwo'
import axios from "axios"
import Cookies from 'js-cookie'
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack'
import { addOrderItems, removeOrderItems } from '../../utils/actions'
import AlertComponent from '../../components/AlertComponent'
// import Razorpay from "razorpay"

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

const mapStateToProps = state => {
    return {
        userInfo: state.userAuthReducer.userInfo,
        userAddress: state.userAddressReducer.userAddress,
        cart: state.addCartReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddOrderItems: (orderItems) => {
            dispatch(addOrderItems(orderItems));
        },
        
        onRemoveOrderItems: () => {
            dispatch(removeOrderItems());
        }
    }
}

function PaymentScreen(props) {
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [alert, setAlert] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if(props.cart.length === 0 || !Cookies.get("userAddress")) {
            router.push("/");
         }
    }, [])

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

    const handlePayment = async () => {
        const amount = getTotalPrice() - getDiscountedPrice() + 200;

        const res = await loadRazorpay();

        if(!res) {
            console.log("Error while loading script!!");
        }
    
        setLoading(true);
        axios.post("/api/payment", {amount: amount})
        .then(res => {
            console.log(res);
            setLoading(false);

            const options = {
                "key": "rzp_test_AXPxBUPNlQkmNe", // Enter the Key ID generated from the Dashboard
                "amount": res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": res.data.order.currency,
                "name": "React Webshop",
                "description": "Online Shop",
                "image": "https://cdn-icons-png.flaticon.com/128/3081/3081648.png",
                "order_id": res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: function (response){
                    axios.post("/api/orders", {orderItems: props.cart, shippingAddress: JSON.parse(Cookies.get("userAddress")), totalAmount: amount, orderID: response.razorpay_order_id, 
                        razorpayPaymentID: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature, userInfo: props.userInfo}, {headers: {
                            authorization: `Bearer ${props.userInfo.token}`,
                        }})
                        .then(res => {
                            console.log(res);
                            if(res.data.message === "success") {
                                console.log(props.cart);
                                axios.post("/api/changeStock", {cart: props.cart})
                                .then(newRes => {
                                    if(newRes.data.result.modifiedCount) {
                                        router.push(`/payment/${res.data.order.orderID}`);
                                        Cookies.remove("cartItems");
                                        Cookies.remove("userAddress");
                                        Cookies.remove("orderID");
                                        Cookies.set("orderID", JSON.stringify(res.data.order.orderID));
                                    } else {
                                        consle.log("Not modified Stock");
                                        router.push(`/payment/${res.data.order.orderID}`);
                                        Cookies.remove("cartItems");
                                        Cookies.remove("userAddress");
                                        Cookies.remove("orderID");
                                        Cookies.set("orderID", JSON.stringify(res.data.order.orderID));
                                    }
                                })
                                .catch(err => console.log(err))                                
                            } else {
                                setAlert(true);
                                setAlertMessage("Something went wrong!! Please try again.");
                                setSeverity("error");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                },
                "theme": {
                    "color": "#ff2d50"
                }
            };

            const rzp1 = new Razorpay(options);

            rzp1.on('payment.failed', function (response){
                // alert(response.error.code); //BAD_REQUEST_ERROR
                setAlert(true);
                setAlertMessage(response.error.description); //Payment Failed
                setSeverity("error");
                setAlert(true);
                setAlertMessage(response.error.source);
                setSeverity("error"); //bank
                // alert(response.error.step); //payment_authorization
                setAlert(true);
                setAlertMessage(response.error.reason); //Payment Failed
                setSeverity("error");
                // alert(response.error.metadata.order_id); //order_********
                // alert(response.error.metadata.payment_id); //pay_********
            });

            rzp1.open();
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <Head>
                <title>React Webshop: PAYMENT</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

                {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
            </Head>
            <div className={styles.paymentScreen}>
                <OrderStatus status={"Payment"} />
                <div className={styles.paymentDiv}>
                    <div className={styles.paymentMethods}>
                        <h1>Address:</h1>
                        {Cookies.get("userAddress") ? <AddressCard address={JSON.parse(Cookies.get("userAddress"))} /> : null} 
                        <h1 className={styles.productDetailsHeading}>Product Details:</h1>
                        <section className={styles.shoppingCartCard}>
                            <ShoppingCartCard cartItem={props.cart} type={"disable"} />
                        </section>
                        <section className={styles.shoppingCartCardTwo}>
                            <ShoppingCartCardTwo cartItem={props.cart} type={"disable"} />
                        </section>
                    </div>
                    <div className={styles.priceCard}>
                        <PriceDetailsCard />
                        {loading 
                        ? <Stack sx={{ color: 'red' }} style={{marginTop: 20}} spacing={2} direction="row">
                            <CircularProgress size={30} color="inherit" />
                        </Stack> 
                        : getTotalPrice() - getDiscountedPrice() + 200 >= 50000 
                            ? <p className={styles.paymentNotAllowed}>*You are not allowed to purchase products worth more than ₹50,000 at once.</p>
                            : <button onClick={() => handlePayment()} type="button">PAY NOW</button>}
                    </div>
                </div>
            </div>
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);