import React, {useEffect, useState} from 'react'
import styles from "../../styles/OrdersAdminScreen.module.scss"
import Head from "next/head"
import DashboardSidebar from '../../components/DashboardSidebar'
import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardWeatherComponent from '../../components/DashboardWeatherComponent';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Order from "../../models/Order";
import convertDocToObj from '../../utils/docToObj';
import { discountedPrice } from '../../utils/discountedPrice';
import axios from "axios";

const mapStateToProps = (state) => {
    return {
      userInfo: state.userAuthReducer.userInfo
    }
  }

function OrdersAdminScreen(props) {
    const [orderID, setOrderID] = useState("");
    const [orderFromServer, setOrderFromServer] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if(!props.userInfo) {
            router.push("/");
        } else {
            if(!props.userInfo.user.admin) {
                router.push("/");
            }
        }
    }, []);

    const searchOrder = (id) => {
        setOrderID(id);
        axios.post("/api/searchOrder", {orderID: id})
        .then(res => {
            setOrderFromServer(res.data.data);
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Head>
                <title>React Webshop: ADMIN ORDERS</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.ordersPage}>
                <DashboardSidebar pageView={"orders"} />
                <div className={styles.ordersPageMain}>
                    <DashboardNavbar />
                    <div className={styles.dashboardArea}>
                        <DashboardWeatherComponent />
                        <div className={styles.ordersHeadingSearch}>
                            <h2>Orders</h2>
                            <div className={styles.ordersSearch}>
                                <input onChange={(e) => searchOrder(e.target.value)} type="text" placeholder="Search by Order ID" />
                                <img src="https://cdn-icons-png.flaticon.com/128/622/622669.png" alt="search-icon" />
                            </div>
                        </div>
                        <div className={styles.ordersTable}>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{width: "140px"}}>Product</th>
                                        <th style={{width: "130px"}}>Category</th>
                                        <th style={{width: "190px"}}>Order ID</th>
                                        <th>Ordered On</th>
                                        <th>Qty</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th style={{width: "90px"}}>Payment Mode</th>
                                        <th style={{width: "90px"}}>Customer Name</th>
                                        <th>Customer Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {orderID.length === 0
                                ? props.ordersArray.map(order => {
                                    return order.orderItems.map((item,index) => {
                                        return <tr key={index}>
                                            <td style={{textAlign: "left"}}>{item.name.substring(0,20)}...</td>
                                            <td>{item.category}</td>
                                            <td>{order.orderID}</td>
                                            <td>{new Date(item.createdAt).getDate() + "/" + (Number(new Date(item.createdAt).getMonth()) + 1).toString() + "/" + new Date(item.createdAt).getFullYear()}</td>
                                            <td>{item.quantity}</td>
                                            <td>₹{discountedPrice(item.price, item.discount)}</td>
                                            <td>Pending</td>
                                            <td>Online</td>
                                            <td>{order.userName}</td>
                                            <td>{order.userEmail}</td>
                                        </tr>
                                    })
                                })
                                : orderFromServer.length === 0 
                                    ? <td>No Order Found!!</td>
                                    : orderFromServer.map(order => {
                                    return order.orderItems.map((item, index) => {
                                        return <tr key={index}>
                                            <td style={{textAlign: "left"}}>{item.name.substring(0,20)}...</td>
                                            <td>{item.category}</td>
                                            <td>{order.orderID}</td>
                                            <td>{new Date(item.createdAt).getDate() + "/" + (Number(new Date(item.createdAt).getMonth()) + 1).toString() + "/" + new Date(item.createdAt).getFullYear()}</td>
                                            <td>{item.quantity}</td>
                                            <td>₹{discountedPrice(item.price, item.discount)}</td>
                                            <td>Pending</td>
                                            <td>Online</td>
                                            <td>{order.userName}</td>
                                            <td>{order.userEmail}</td>
                                        </tr>
                                    })
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(OrdersAdminScreen);

export async function getServerSideProps(context) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    
    const orders = await Order.find({createdAt: {$gte: new Date(`${year}/${month+1}/01`), $lte: new Date(`${year}/${month+1}/30`)}}).lean();

    return {
        props: {
            ordersArray: orders.map(order => convertDocToObj(order))
        }
    }
}