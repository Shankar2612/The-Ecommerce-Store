import React from 'react'
import styles from "../styles/SignInReminder.module.scss"
import Link from "next/link"

export default function SignInReminder() {
    return (
        <div className={styles.signInReminderContainer}>
            <p>You have not signed in yet. Please Sign in to buy items.</p>
            <Link href="/login">Sign In</Link>
        </div>
    )
}
