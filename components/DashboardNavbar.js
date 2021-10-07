import React from 'react'
import styles from "../styles/DashboardNavbar.module.scss"

export default function DashboardNavbar() {
    return (
        <div className={styles.mainNavbar}>
            <img src="https://cdn-icons-png.flaticon.com/128/3011/3011270.png" alt="user-icon" />
            <div className={styles.navbarAdminDetails}>
                <p className={styles.name}>Bhabani Shankar Das</p>
                <p>Admin</p>
            </div>
        </div>
    )
}
