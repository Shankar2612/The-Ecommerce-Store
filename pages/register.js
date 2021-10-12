import React, {useEffect, useState} from 'react'
import styles from "../styles/RegisterScreen.module.scss"
import Head from "next/head"
import Link from "next/link"
import axios from "axios"
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack'
import AlertComponent from '../components/AlertComponent'

import {connect} from "react-redux"
import router from 'next/router'

const mapStateToProps = (state) => {
    return {
        userInfo: state.userAuthReducer.userInfo
    }
}

function RegisterScreen({userInfo}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        if(userInfo) {
            router.push("/");
        } 
    }, []);

    const onHandleRegister = () => {
        if(name.length === 0) {
            setAlert(true);
            setAlertMessage("Please enter your Name");
            setSeverity("error");
        } else if(email.length === 0) {
            setAlert(true);
            setAlertMessage("Please enter your Email");
            setSeverity("error");
        } else if(password.length === 0) {
            setAlert(true);
            setAlertMessage("Please enter your Password");
            setSeverity("error");
        } else if(confirmPassword.length === 0) {
            setAlert(true);
            setAlertMessage("Please enter Confirm Password");
            setSeverity("error");
        } else if(confirmPassword !== password) {
            setAlert(true);
            setAlertMessage("Password and Confirm Password doesn't match");
            setSeverity("error");
            setPassword("");
            setConfirmPassword("");
        } else {
            setLoading(true);
            axios.post("/api/users/register", {name: name, email: email, password: password})
            .then(res => {
                setLoading(false);
                if(res.data.message === "User registered successfully!!") {
                    setAlert(true);
                    setAlertMessage(res.data.message);
                    setSeverity("success");
                    router.push("/login");
                } else {
                    setAlert(true);
                    setAlertMessage(res.data.message);
                    setSeverity("error");
                }
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            })
        }
    }

    return (
        <div>
            <Head>
            <title>The Ecom Store: Register</title>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <div className={styles.register}>
                <Link href="/">LOGO.</Link>
                <div className={styles.registerCard}>
                    <h1>Register</h1>
                    <hr />
                    <div className={styles.registerContainer}>
                        <p className={styles.email}>Name</p>
                        <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
                        <p className={styles.email}>Email</p>
                        <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
                        <p className={styles.email}>Password</p>
                        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        <p className={styles.email}>Confirm Password</p>
                        <input value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        {loading 
                        ? <Stack sx={{ color: 'red' }} style={{marginBottom: 17}} spacing={2} direction="row">
                            <CircularProgress size={30} color="inherit" />
                        </Stack> 
                        : <button onClick={onHandleRegister} type="button">Register</button>}
                    </div>
                    <p>Already have an account? <Link href="/login">Sign In</Link></p>
                </div>
            </div>
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}

export default connect(mapStateToProps)(RegisterScreen);