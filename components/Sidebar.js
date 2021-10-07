import React from 'react'
import styles from "../styles/Sidebar.module.scss"
import Link from "next/link"
import { useRouter } from 'next/router'

import {connect} from "react-redux"

const mapStateToProps = state => {
    return {
        userInfo: state.userAuthReducer.userInfo
    }
}

function Sidebar(props) {

    const router = useRouter();

    const date = new Date();
    const hours = date.getHours();
    let salutation = "";

    if(hours >= 0 && hours < 12) {
        salutation = "Good Morning";
    } else if(hours >= 12 && hours <= 16) {
        salutation = "Good Afternoon";
    } else {
        salutation = "Good Evening";
    }

    const handleRoute = (category) => {
        router.push(`/search?s=${router.query.s ? router.query.s : ""}&category=${category}&subCategory=${router.query.subCategory ? router.query.subCategory: "all"}&price=${router.query.price ? router.query.price : "all"}&rating=${router.query.rating ? router.query.rating : "all"}&brand=${router.query.brand ? router.query.brand : "all"}&color=${router.query.color ? router.query.color : "all"}`);
    }

    return (
        <div className={`${styles[props.sidebarOpen]}`}>
            <div className={styles.sidebarHeading}>
                <div className={styles.sidebarHeadingImgDiv}>
                    <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" alt="user-img" />
                    <div className={styles.userInfo}>
                        <p className={styles.salutation}>{salutation},</p>
                        {props.userInfo 
                        ? props.userInfo.user.admin ? <p>{props.userInfo.user.name} <Link href="/admin/dashboard">View Dashboard</Link></p> : <p>{props.userInfo.user.name}</p> 
                        : <p>User</p>}
                    </div>
                </div>
                <img style={{width: 25}} onClick={() => props.handleSidebar()} src="https://cdn-icons-png.flaticon.com/512/660/660252.png" alt="close-icon" />
            </div>
            <div onClick={() => handleRoute("Electronics")} className={styles.categoriesElectronics}>
                <p>Electronics</p>
            </div>
            <div onClick={() => handleRoute("Computers and Hardwares")} className={styles.categoriesComputers}>
                <p>Computers</p>
            </div>
            <div  onClick={() => handleRoute("Men Fashion")} className={styles.categoriesMen}>
                <p>Men Fashion</p>
            </div>
            <div onClick={() => handleRoute("Women Fashion")} className={styles.categoriesWomen}>
                <p>Women Fashion</p>
            </div>
            <div onClick={() => handleRoute("Kid Fashion")} className={styles.categoriesKids}>
                <p>Kids Fashion</p>
            </div>
            <div className={styles.settings}>
                <h3 className={styles.settingsHeading}>Settings</h3>
                <div className={styles.savedAddresses}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2210/2210296.png" alt="password-icon" />
                    <p>Forgot Password?</p>
                </div>
                {props.userInfo ? <div className={styles.savedAddresses}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1008/1008010.png" alt="orders-icon" />
                    <p><Link href="/orders">My Orders</Link></p>
                </div> : null}
                {props.userInfo 
                ? <div className={styles.savedAddresses}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828427.png" alt="logout-icon" />
                    <button onClick={() => props.onUserLogout()} type="button">Log Out</button>
                </div>
                : <div className={styles.savedAddresses}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1330/1330247.png" alt="login-icon" />
                    <Link href="/login">Sign In</Link>
                </div>}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Sidebar);
