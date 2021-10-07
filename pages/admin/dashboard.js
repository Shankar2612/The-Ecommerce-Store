import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Head from "next/head";
import styles from "../../styles/DashboardScreen.module.scss";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardSmallCard from "../../components/DashboardSmallCard";
import Order from "../../models/Order";
import User from "../../models/User";
import Product from "../../models/Product";
import OrdersGraphComponent from '../../components/OrdersGraphComponent';
import SalesGraphComponent from '../../components/SalesGraphComponent';
import CustomersGraphComponent from '../../components/CustomersGraphComponent';
import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardWeatherComponent from '../../components/DashboardWeatherComponent';

const mapStateToProps = (state) => {
    return {
      userInfo: state.userAuthReducer.userInfo
    }
  }

function DashboardScreen(props) {
    const [totalOrderCard, setTotalOrderCard] = useState(true);
    const [totalSalesCard, setTotalSalesCard] = useState(false);
    const [totalCustomersCard, setTotalCustomersCard] = useState(false);
    const [totalProductsCard, setTotalProductsCard] = useState(false);

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

    const onChangeCardActive = (cardName) => {
        if(cardName === "Total Orders") {
            setTotalOrderCard(true);
            setTotalSalesCard(false);
            setTotalCustomersCard(false);
            setTotalProductsCard(false);
        } else if (cardName === "Total Sales") {
            setTotalSalesCard(true);
            setTotalCustomersCard(false);
            setTotalProductsCard(false);
            setTotalOrderCard(false);
        } else if (cardName === "Total Customers") {
            setTotalCustomersCard(true);
            setTotalProductsCard(false);
            setTotalOrderCard(false);
            setTotalSalesCard(false);
        } else {
            setTotalProductsCard(true);
            setTotalOrderCard(false);
            setTotalSalesCard(false);
            setTotalCustomersCard(false);
        }
    }

    return (
        <div>
            <Head>
                <title>React Webshop: ADMIN DASHBOARD</title>

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
            <div className={styles.dashboard}>
                <DashboardSidebar pageView={"dashboard"} />
                <div className={styles.dashboardMain}>
                    <DashboardNavbar />
                    <div className={styles.dashboardArea}>
                        <DashboardWeatherComponent />
                        <div className={styles.dashboardCard}>
                            <DashboardSmallCard onChangeCardActive={onChangeCardActive} name={"Total Orders"} count={props.totalOrders} active={totalOrderCard} image={"https://cdn-icons-png.flaticon.com/128/1524/1524983.png"} />
                            <DashboardSmallCard onChangeCardActive={onChangeCardActive} name={"Total Sales"} count={props.totalPrice} active={totalSalesCard} image={"https://cdn-icons-png.flaticon.com/128/1763/1763438.png"} />
                            <DashboardSmallCard onChangeCardActive={onChangeCardActive} name={"Total Customers"} count={props.totalCustomers} active={totalCustomersCard} image={"https://cdn-icons-png.flaticon.com/128/3225/3225069.png"} />
                            <DashboardSmallCard onChangeCardActive={onChangeCardActive} name={"Total Products"} count={props.totalProducts} active={totalProductsCard} image={"https://cdn-icons-png.flaticon.com/128/2674/2674505.png"} />
                        </div>
                        <div className={styles.graphAndProductsCategories}>
                            {totalOrderCard ? <OrdersGraphComponent data={props.ordersTotalArray} /> : null}
                            {totalSalesCard ? <SalesGraphComponent data={props.totalSalesArray} /> : null}
                            {totalCustomersCard ? <CustomersGraphComponent data={props.totalCustomersArray} /> : null}
                            {totalProductsCard ? <OrdersGraphComponent data={props.ordersTotalArray} /> : null}
                            <div className={styles.productsCategories}>
                                <div className={styles.products}>
                                    <p>Top Selling Products</p>
                                    <p className={styles.description}>These are the products bought by maximum customers today.</p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sl No.</th>
                                                <th>Products</th>
                                                <th>Units Sold</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {props.ordersSoldTodayArray.map((orderSoldToday, index) => {
                                            return <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{orderSoldToday.name.substring(0, 20)}...</td>
                                                    <td>{orderSoldToday.unitsSold}</td>
                                                </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.categories}>
                                    <p>Top Categories</p>
                                    <p className={styles.description}>These are the categories which are loved by our customers.</p>
                                    <table>
                                        {props.ordersSoldTodayArray.map((orderSoldToday, index) => {
                                            return <tr>
                                                    <td><div className={styles.bulletedList}></div></td>
                                                    <td>{orderSoldToday.category}</td>
                                                </tr>
                                        })}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(DashboardScreen);

export async function getServerSideProps(context) {

    const totalOrders = await Order.countDocuments({});
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const orders = await Order.find({}).lean();
    let ordersInBtw = 0;
    let ordersTotalArray = [];
    const date = new Date().getDate();
    const ordersSoldToday = await Order.find({createdAt: {$gt: new Date(`2021/09/${date}`), $lt: new Date(`2021/09/${date+1}`)}}).lean();

    let ordersSoldTodayArray = [];

    ordersSoldToday.map(orderSoldToday => {
        orderSoldToday.orderItems.map(item => {

            if(ordersSoldTodayArray.length === 0) {
                ordersSoldTodayArray.push({
                    name: item.name,
                    unitsSold: 1,
                    category: item.category
                });
            } 

            else {
                ordersSoldTodayArray.map(order => {
                    if(item.name === order.name) {
                        order.unitsSold = order.unitsSold+1;
                    } else {
                        ordersSoldTodayArray.push({
                            name: item.name,
                            unitsSold: 1,
                            category: item.category
                        });
                    }
                })
            }
        })
    })

    for(let i = 1; i <= 12; i++) {
        const year = new Date().getFullYear();
        ordersInBtw = await Order.find({createdAt: {$gte: new Date(`${year}/${i}/${1}`), $lte: new Date(`${year}/${i}/${30}`)}}).lean();
        ordersTotalArray.push(ordersInBtw.length);
    }

    let totalSalesInMonth = 0;
    let totalSalesArray = [];

    for(let i = 1; i <= 12; i++) {
        const year = new Date().getFullYear();
        let totalOrdersInMonth = await Order.find({createdAt: {$gte: new Date(`${year}/${i}/${1}`), $lte: new Date(`${year}/${i}/${30}`)}}).lean();
        totalOrdersInMonth.map(order => {
            totalSalesInMonth = totalSalesInMonth + order.totalPrice;
        })
        totalSalesArray.push(totalSalesInMonth);
        totalSalesInMonth = 0;
    }

    let totalCustomersArray = [];

    for(let i = 1; i <= 12; i++) {
        const year = new Date().getFullYear();
        let totalCustomersInMonth = await User.find({createdAt: {$gte: new Date(`${year}/${i}/${1}`), $lte: new Date(`${year}/${i}/${30}`)}}).lean();
        totalCustomersArray.push(totalCustomersInMonth.length);
    }


    let totalPrice = 0;
    orders.map(order => {
        totalPrice = totalPrice + order.totalPrice;
    })
    return {
        props: {
            totalOrders: totalOrders,
            totalPrice: totalPrice,
            totalCustomers: totalUsers,
            totalProducts: totalProducts,
            ordersTotalArray: ordersTotalArray,
            ordersSoldTodayArray: ordersSoldTodayArray,
            totalSalesArray: totalSalesArray,
            totalCustomersArray: totalCustomersArray
        }
    }
}