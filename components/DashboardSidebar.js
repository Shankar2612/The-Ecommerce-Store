import React from 'react';
import styles from "../styles/DashboardSidebar.module.scss";
import Link from "next/link";

export default function DashboardSidebar(props) {
    return (
        <div className={styles.dashboardSidebar}>
            <h2>React Webshop</h2>
            <div className={styles.dashboardNavItems}>
                <Link href="/admin/dashboard" passHref>
                    <a style={{width: "100%"}}>
                        <div className={props.pageView === "dashboard" ? styles.navItemActive : styles.navItemInactive}>
                            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828673.png" alt="dashboard-icon" />
                            <p>Dashboard</p>
                        </div>
                    </a>
                </Link>
                <Link href="/admin/orders" passHref>
                    <a style={{width: "100%"}}>
                        <div className={props.pageView === "orders" ? styles.navItemActive : styles.navItemInactive}>
                            <img src="https://cdn-icons-png.flaticon.com/128/3500/3500833.png" alt="orders-icon" />
                            <p>Orders</p>
                        </div>
                    </a>
                </Link>
                <Link href="/admin/products" passHref>
                    <a style={{width: "100%"}}>
                        <div className={props.pageView === "products" ? styles.navItemActive : styles.navItemInactive}>
                            <img src="https://cdn-icons-png.flaticon.com/128/1524/1524855.png" alt="products-icon" />
                            <p>Products</p>
                        </div>
                    </a>
                </Link>
                <Link href="/admin/customers" passHref>
                    <a style={{width: "100%"}}>
                        <div className={props.pageView === "customers" ? styles.navItemActive : styles.navItemInactive}>
                            <img src="https://cdn-icons-png.flaticon.com/128/4149/4149882.png" alt="customers-icon" />
                            <p>Customers</p>
                        </div>
                    </a>
                </Link>
            </div>
            <p>All Rights Reserved®</p>
        </div>
    )
}
