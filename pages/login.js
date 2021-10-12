import React, { useEffect, useState } from 'react'
import styles from "../styles/LoginScreen.module.scss"
import Head from "next/head"
import Link from "next/link"
import {useRouter} from "next/router"
import axios from "axios"
import Cookies from 'js-cookie'
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack'
import AlertComponent from '../components/AlertComponent'

import {connect} from "react-redux"
import { userLogin } from '../utils/actions'

const mapStateToProps = (state) => {
    return {
        userInfo: state.userAuthReducer.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogin: (userInfo) => {
            dispatch(userLogin(userInfo));
        }
    }
}

function LoginScreen({onUserLogin, userInfo}) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        if(userInfo) {
            router.push("/");
        } 
    }, []);

    const router = useRouter();

    const onHandleSignIn = () => {
        if(email.length === 0) {
            setAlert(true);
            setAlertMessage("Please Enter your Email");
            setSeverity("error");
        } else if(password.length === 0) {
            setAlert(true);
            setAlertMessage("Please Enter your Password");
            setSeverity("error");
        } else {
            setLoading(true);
            axios.post('/api/users/login', {
                email: email,
                password: password
              })
              .then(res => {
                    setLoading(false);
                  if(res.data.message === "Successfully logged in.") {
                    setAlert(true);
                    setAlertMessage(`Welcome back!! ${res.data.user.name}`);
                    setSeverity("success");
                    Cookies.set("userInfo", JSON.stringify(res.data));
                    router.push("/");
                    onUserLogin(res.data);
                    setEmail("");
                    setPassword("");
                  } else {
                    setAlert(true);
                    setAlertMessage(res.data.message);
                    setSeverity("error");
                    setEmail("");
                    setPassword("");
                  }
              }).catch(err => {
                  console.log(err);
                  setEmail("");
                  setPassword("");
                  setLoading(false);
              })
        }
    }

    return (
        <div>
            <Head>
                <title>The Ecom Store: Sign In</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <div className={styles.login}>
                <Link href="/">LOGO.</Link>
                <div className={styles.loginCard}>
                    <h1>Sign-In</h1>
                    <hr />
                    <div className={styles.signinContainer}>
                        <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" alt="Hello_User_Img" />
                        <p>Welcome Back!!</p>
                        <hr />
                        <p className={styles.email}>Email</p>
                        <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
                        <p className={styles.email}>Password</p>
                        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        {loading 
                        ? <Stack sx={{ color: 'red' }} style={{marginBottom: 17}} spacing={2} direction="row">
                            <CircularProgress size={30} color="inherit" />
                        </Stack>
                        : <button onClick={onHandleSignIn} type="button">Sign In</button>}
                    </div>
                    <p>Don&apos;t have an account? <Link href="/register">Register</Link></p>
                </div>
            </div>
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);