import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import styles from "../styles/OrdersScreen.module.scss"
import Navbar from "../components/Navbar"
import Head from "next/head"
import Link from "next/link"
import Sidebar from '../components/Sidebar'
import BlackScreen from '../components/BlackScreen'
import Footer from '../components/Footer'
import { userLogout } from '../utils/actions'
import Cookies from 'js-cookie'
import MyOrderCard from '../components/MyOrderCard'
import cookie from 'cookie'
import Order from '../models/Order'
import convertDocToObj from '../utils/docToObj'
import AlertComponent from '../components/AlertComponent'

const mapStateToProps = (state) => {
    return {
        userInfo: state.userAuthReducer.userInfo,
        orderItems: state.userOrderReducer.orderItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {  
      onUserLogout: () => {
        dispatch(userLogout());
        Cookies.remove("userInfo");
        Cookies.remove("cartItems");
        Cookies.remove("userAddress");
      }
    }
  }

function OrdersScreen(props) {

    const router = useRouter();
    const [sideBar, setSideBar] = useState("none");
    const [blackScreen, setBlackScreen] = useState("none");
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        if(!props.userInfo) {
            router.push("/");
        }
    })
  
    const handleSidebar = () => {
      if(sideBar === "none") {
        setSideBar("sidebar");
        setBlackScreen("enable");
      } else {
        setSideBar("none");
        setBlackScreen("none");
      }
    }

    const userLogout = () => {
        setAlert(true);
        setAlertMessage("User successfully Logged out!!");
        setSeverity("success");
        props.onUserLogout();
    }

    return (
        <div>
            <Head>
                <title>React Webshop: Orders</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <div className={styles.orders}>
                <Navbar handleSidebar={handleSidebar} />
                <div className={styles.orderPage}>
                    <div className={styles.orderDetails}>
                        <h1>All Orders:</h1>
                        {props.orders ? props.orders.map(order => {
                            return order.orderItems.map((eachOrder, index) => {
                                return <MyOrderCard key={index} order={eachOrder} orderItem={order} />
                            })
                        }) : <div className={styles.noOrders}>
                            <img src="https://cdn-icons-png.flaticon.com/128/1376/1376786.png" alt="empty-box-icon" />
                            <p>You do not have any Orders yet!!</p>
                            <Link href="/">Continue Shopping</Link>
                        </div>}
                    </div> 
                </div>
            </div>
            <Footer />
            <Sidebar onUserLogout={userLogout} handleSidebar={handleSidebar} sidebarOpen={sideBar} />
            {blackScreen === "none" ? null : <BlackScreen />}
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);

export async function getServerSideProps(context) {

    if(cookie.parse(context.req.headers.cookie).userInfo) {
        const name = JSON.parse(cookie.parse(context.req.headers.cookie).userInfo).user.name;
        // console.log(name);
        const orders = await Order.find({userName: name}).lean();

        console.log("ORDERS", orders);

        if(orders.length !== 0) {
            return {
                props: {
                    orders: orders.map(order => convertDocToObj(order))
                }
            }
        } else {
            return {
                props: {
                    orders: null
                }
            }
        }
    } else {
        return {
            props: {
                orders: null
            }
        }
    }
}