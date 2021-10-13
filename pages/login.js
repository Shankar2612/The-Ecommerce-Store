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
                <Link href="/" passHref>
                    <a>
                        <svg width="130" height="50" viewBox="0 0 297 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.64 36.8C33.4667 36.96 34.08 37.24 34.48 37.64C34.9067 38.04 35.12 38.5067 35.12 39.04C35.12 39.92 34.8667 40.56 34.36 40.96C33.88 41.36 33.1067 41.52 32.04 41.44C29.64 41.2533 27.76 41.1333 26.4 41.08C25.0667 41 23.3067 40.9467 21.12 40.92C20.1333 45.8267 19.2267 50.76 18.4 55.72C18.1067 57.5333 17.8 59.64 17.48 62.04C17.16 64.4133 16.9467 66.3333 16.84 67.8C16.7867 68.5733 16.4667 69.1733 15.88 69.6C15.2933 70 14.5867 70.2 13.76 70.2C12.88 70.2 12.2 69.9867 11.72 69.56C11.24 69.1333 11 68.5733 11 67.88C11 67.24 11.0933 66.1867 11.28 64.72C11.4933 63.2267 11.7333 61.6667 12 60.04C12.2933 58.4133 12.52 57 12.68 55.8C12.9733 53.7733 13.3067 51.76 13.68 49.76C14.0533 47.76 14.4267 45.8667 14.8 44.08C14.88 43.68 14.9733 43.2267 15.08 42.72C15.1867 42.1867 15.3067 41.6 15.44 40.96C12.8267 41.04 10.7733 41.2533 9.28 41.6C7.78667 41.9467 6.72 42.44 6.08 43.08C5.46667 43.6933 5.16 44.4933 5.16 45.48C5.16 46.3867 5.42667 47.2533 5.96 48.08C6.06667 48.2667 6.12 48.4667 6.12 48.68C6.12 49.1867 5.81333 49.6667 5.2 50.12C4.61333 50.5467 4 50.76 3.36 50.76C2.90667 50.76 2.53333 50.6267 2.24 50.36C1.70667 49.9067 1.26667 49.2667 0.92 48.44C0.573333 47.5867 0.4 46.6267 0.4 45.56C0.4 43.2933 1.13333 41.48 2.6 40.12C4.09333 38.7333 6.34667 37.72 9.36 37.08C12.4 36.44 16.2933 36.12 21.04 36.12C23.9733 36.12 26.3067 36.1733 28.04 36.28C29.8 36.3867 31.3333 36.56 32.64 36.8ZM51.8106 61.08C52.1573 61.08 52.424 61.24 52.6106 61.56C52.824 61.88 52.9306 62.32 52.9306 62.88C52.9306 63.9467 52.6773 64.7733 52.1706 65.36C50.944 66.7733 49.6773 67.9333 48.3706 68.84C47.0906 69.7467 45.624 70.2 43.9706 70.2C42.6106 70.2 41.584 69.8133 40.8906 69.04C40.1973 68.24 39.8506 67.0933 39.8506 65.6C39.8506 64.8533 40.0373 63.52 40.4106 61.6C40.7573 59.92 40.9306 58.76 40.9306 58.12C40.9306 57.6933 40.784 57.48 40.4906 57.48C40.144 57.48 39.6506 57.9333 39.0106 58.84C38.3706 59.72 37.7306 60.8933 37.0906 62.36C36.4506 63.8267 35.9306 65.3733 35.5306 67C35.024 69.1333 33.7706 70.2 31.7706 70.2C30.9706 70.2 30.4373 69.92 30.1706 69.36C29.9306 68.7733 29.8106 67.7333 29.8106 66.24C29.8106 65.3867 29.824 64.7067 29.8506 64.2L29.8906 61C29.8906 56.8933 30.304 52.6133 31.1306 48.16C31.984 43.7067 33.224 39.9733 34.8506 36.96C36.504 33.92 38.4773 32.4 40.7706 32.4C41.9973 32.4 42.984 32.9333 43.7306 34C44.504 35.04 44.8906 36.4 44.8906 38.08C44.8906 40.7733 44.104 43.5733 42.5306 46.48C40.9573 49.36 38.3973 52.7333 34.8506 56.6C34.7706 57.9867 34.7306 59.4133 34.7306 60.88C35.6106 58.6133 36.584 56.7733 37.6506 55.36C38.744 53.92 39.8106 52.8933 40.8506 52.28C41.9173 51.6667 42.8906 51.36 43.7706 51.36C45.504 51.36 46.3706 52.2267 46.3706 53.96C46.3706 55 46.0773 56.88 45.4906 59.6C44.984 61.92 44.7306 63.4533 44.7306 64.2C44.7306 65.2667 45.1173 65.8 45.8906 65.8C46.424 65.8 47.0506 65.48 47.7706 64.84C48.5173 64.1733 49.504 63.1067 50.7306 61.64C51.0506 61.2667 51.4106 61.08 51.8106 61.08ZM39.9306 36.36C39.4506 36.36 38.9173 37.0533 38.3306 38.44C37.744 39.8 37.1706 41.6533 36.6106 44C36.0773 46.32 35.6373 48.8533 35.2906 51.6C36.944 49.6533 38.304 47.5333 39.3706 45.24C40.464 42.9467 41.0106 40.8667 41.0106 39C41.0106 38.1467 40.9173 37.4933 40.7306 37.04C40.544 36.5867 40.2773 36.36 39.9306 36.36ZM64.8087 62.28C65.1554 62.28 65.4221 62.44 65.6087 62.76C65.8221 63.08 65.9287 63.52 65.9287 64.08C65.9287 65.04 65.7021 65.8667 65.2487 66.56C64.5021 67.7067 63.5154 68.6 62.2887 69.24C61.0887 69.88 59.6487 70.2 57.9687 70.2C55.4087 70.2 53.4221 69.44 52.0087 67.92C50.5954 66.3733 49.8887 64.2933 49.8887 61.68C49.8887 59.84 50.2754 58.1333 51.0487 56.56C51.8221 54.96 52.8887 53.6933 54.2487 52.76C55.6354 51.8267 57.1954 51.36 58.9287 51.36C60.4754 51.36 61.7154 51.8267 62.6487 52.76C63.5821 53.6667 64.0487 54.9067 64.0487 56.48C64.0487 58.32 63.3821 59.9067 62.0487 61.24C60.7421 62.5467 58.5021 63.5867 55.3287 64.36C55.9687 65.5867 57.0487 66.2 58.5687 66.2C59.6621 66.2 60.5554 65.9467 61.2487 65.44C61.9687 64.9333 62.7954 64.08 63.7287 62.88C64.0487 62.48 64.4087 62.28 64.8087 62.28ZM58.2487 55.28C57.2621 55.28 56.4221 55.8533 55.7287 57C55.0621 58.1467 54.7287 59.5333 54.7287 61.16V61.24C56.3021 60.8667 57.5421 60.3067 58.4487 59.56C59.3554 58.8133 59.8087 57.9467 59.8087 56.96C59.8087 56.4533 59.6621 56.0533 59.3687 55.76C59.1021 55.44 58.7287 55.28 58.2487 55.28Z" fill="#4A7BFA"/>
                            <path d="M210.08 70.32C206.533 70.32 203.693 69.6533 201.56 68.32C199.427 66.96 198.36 64.8933 198.36 62.12C198.36 60.6533 198.613 59.5333 199.12 58.76C199.627 57.9867 200.373 57.6 201.36 57.6C202.08 57.6 202.667 57.7867 203.12 58.16C203.573 58.5333 203.8 59.0133 203.8 59.6C203.8 60.1333 203.76 60.6 203.68 61C203.68 61.1067 203.653 61.2933 203.6 61.56C203.573 61.8267 203.56 62.1067 203.56 62.4C203.56 63.6 204.16 64.4933 205.36 65.08C206.587 65.6667 208.293 65.96 210.48 65.96C212.747 65.96 214.52 65.56 215.8 64.76C217.08 63.9333 217.72 62.7867 217.72 61.32C217.72 60.4133 217.427 59.64 216.84 59C216.253 58.3333 215.52 57.7867 214.64 57.36C213.76 56.9067 212.52 56.36 210.92 55.72C208.867 54.92 207.187 54.16 205.88 53.44C204.6 52.72 203.493 51.7467 202.56 50.52C201.653 49.2667 201.2 47.72 201.2 45.88C201.2 43.96 201.707 42.2533 202.72 40.76C203.76 39.2667 205.24 38.1067 207.16 37.28C209.107 36.4533 211.387 36.04 214 36.04C215.947 36.04 217.733 36.3333 219.36 36.92C220.987 37.48 222.28 38.3467 223.24 39.52C224.227 40.6933 224.72 42.1333 224.72 43.84C224.72 45.52 224.467 46.7867 223.96 47.64C223.453 48.4933 222.707 48.92 221.72 48.92C221.027 48.92 220.44 48.7067 219.96 48.28C219.507 47.8533 219.28 47.3467 219.28 46.76C219.28 46.2533 219.32 45.7867 219.4 45.36C219.48 44.56 219.52 44.0533 219.52 43.84C219.52 42.72 218.973 41.8667 217.88 41.28C216.787 40.6933 215.427 40.4 213.8 40.4C211.507 40.4 209.747 40.8267 208.52 41.68C207.32 42.5067 206.72 43.68 206.72 45.2C206.72 46.2133 207.027 47.08 207.64 47.8C208.28 48.52 209.067 49.12 210 49.6C210.933 50.08 212.24 50.6533 213.92 51.32C215.947 52.1467 217.573 52.8933 218.8 53.56C220.027 54.2267 221.067 55.1333 221.92 56.28C222.8 57.4267 223.24 58.84 223.24 60.52C223.24 63.6667 222.04 66.0933 219.64 67.8C217.267 69.48 214.08 70.32 210.08 70.32ZM244.904 61.08C245.25 61.08 245.517 61.24 245.704 61.56C245.917 61.88 246.024 62.32 246.024 62.88C246.024 63.9467 245.77 64.7733 245.264 65.36C244.117 66.7733 242.864 67.9333 241.504 68.84C240.144 69.7467 238.584 70.2 236.824 70.2C231.384 70.2 228.664 66.3733 228.664 58.72C228.664 57.5467 228.704 56.36 228.784 55.16H227.224C226.424 55.16 225.877 55.0133 225.584 54.72C225.317 54.4267 225.184 53.96 225.184 53.32C225.184 51.8267 225.784 51.08 226.984 51.08H229.264C229.717 48.1467 230.41 45.4667 231.344 43.04C232.277 40.6133 233.397 38.68 234.704 37.24C236.037 35.8 237.464 35.08 238.984 35.08C240.104 35.08 240.984 35.5733 241.624 36.56C242.264 37.5467 242.584 38.7867 242.584 40.28C242.584 44.4133 240.85 48.0133 237.384 51.08H241.864C242.29 51.08 242.597 51.1733 242.784 51.36C242.97 51.5467 243.064 51.8933 243.064 52.4C243.064 54.24 241.557 55.16 238.544 55.16H233.664C233.61 56.4933 233.584 57.5333 233.584 58.28C233.584 61.0533 233.904 63 234.544 64.12C235.21 65.24 236.25 65.8 237.664 65.8C238.81 65.8 239.824 65.4533 240.704 64.76C241.584 64.0667 242.624 63.0267 243.824 61.64C244.144 61.2667 244.504 61.08 244.904 61.08ZM237.904 38.92C237.504 38.92 237.05 39.4267 236.544 40.44C236.064 41.4267 235.597 42.8133 235.144 44.6C234.717 46.36 234.357 48.32 234.064 50.48C235.637 49.12 236.81 47.6 237.584 45.92C238.384 44.2133 238.784 42.6667 238.784 41.28C238.784 39.7067 238.49 38.92 237.904 38.92ZM263.967 57.72C264.314 57.72 264.58 57.8933 264.767 58.24C264.954 58.5867 265.047 59.0267 265.047 59.56C265.047 60.84 264.66 61.6 263.887 61.84C262.287 62.4 260.527 62.72 258.607 62.8C258.1 65.04 257.1 66.84 255.607 68.2C254.114 69.5333 252.42 70.2 250.527 70.2C248.927 70.2 247.554 69.8133 246.407 69.04C245.287 68.2667 244.434 67.24 243.847 65.96C243.26 64.68 242.967 63.2933 242.967 61.8C242.967 59.7733 243.354 57.9733 244.127 56.4C244.9 54.8 245.967 53.56 247.327 52.68C248.687 51.7733 250.194 51.32 251.847 51.32C253.874 51.32 255.5 52.0267 256.727 53.44C257.98 54.8267 258.714 56.5467 258.927 58.6C260.18 58.52 261.674 58.2533 263.407 57.8C263.62 57.7467 263.807 57.72 263.967 57.72ZM250.847 65.96C251.7 65.96 252.434 65.6133 253.047 64.92C253.687 64.2267 254.114 63.2267 254.327 61.92C253.5 61.36 252.86 60.6267 252.407 59.72C251.98 58.8133 251.767 57.8533 251.767 56.84C251.767 56.4133 251.807 55.9867 251.887 55.56H251.687C250.62 55.56 249.727 56.08 249.007 57.12C248.314 58.1333 247.967 59.5733 247.967 61.44C247.967 62.9067 248.247 64.0267 248.807 64.8C249.394 65.5733 250.074 65.96 250.847 65.96ZM265.254 70.2C264.24 70.2 263.52 69.6667 263.094 68.6C262.694 67.5333 262.494 65.8267 262.494 63.48C262.494 60.0133 262.987 56.72 263.974 53.6C264.214 52.8267 264.6 52.2667 265.134 51.92C265.694 51.5467 266.467 51.36 267.454 51.36C267.987 51.36 268.36 51.4267 268.574 51.56C268.787 51.6933 268.894 51.9467 268.894 52.32C268.894 52.7467 268.694 53.7067 268.294 55.2C268.027 56.2667 267.814 57.2 267.654 58C267.494 58.8 267.36 59.7867 267.254 60.96C268.134 58.6667 269.12 56.8 270.214 55.36C271.307 53.92 272.374 52.8933 273.414 52.28C274.48 51.6667 275.454 51.36 276.334 51.36C278.067 51.36 278.934 52.2267 278.934 53.96C278.934 54.3067 278.814 55.1467 278.574 56.48C278.36 57.5467 278.254 58.2133 278.254 58.48C278.254 59.4133 278.587 59.88 279.254 59.88C280 59.88 280.96 59.2933 282.134 58.12C282.48 57.7733 282.84 57.6 283.214 57.6C283.56 57.6 283.827 57.76 284.014 58.08C284.227 58.3733 284.334 58.7733 284.334 59.28C284.334 60.2667 284.067 61.04 283.534 61.6C282.787 62.3733 281.907 63.04 280.894 63.6C279.907 64.1333 278.854 64.4 277.734 64.4C276.32 64.4 275.24 64.04 274.494 63.32C273.774 62.6 273.414 61.6267 273.414 60.4C273.414 60 273.454 59.6 273.534 59.2C273.587 58.6667 273.614 58.3067 273.614 58.12C273.614 57.6933 273.467 57.48 273.174 57.48C272.774 57.48 272.24 57.9333 271.574 58.84C270.934 59.72 270.294 60.8933 269.654 62.36C269.014 63.8267 268.494 65.3733 268.094 67C267.8 68.2533 267.454 69.1067 267.054 69.56C266.68 69.9867 266.08 70.2 265.254 70.2ZM295.737 62.28C296.084 62.28 296.35 62.44 296.537 62.76C296.75 63.08 296.857 63.52 296.857 64.08C296.857 65.04 296.63 65.8667 296.177 66.56C295.43 67.7067 294.444 68.6 293.217 69.24C292.017 69.88 290.577 70.2 288.897 70.2C286.337 70.2 284.35 69.44 282.937 67.92C281.524 66.3733 280.817 64.2933 280.817 61.68C280.817 59.84 281.204 58.1333 281.977 56.56C282.75 54.96 283.817 53.6933 285.177 52.76C286.564 51.8267 288.124 51.36 289.857 51.36C291.404 51.36 292.644 51.8267 293.577 52.76C294.51 53.6667 294.977 54.9067 294.977 56.48C294.977 58.32 294.31 59.9067 292.977 61.24C291.67 62.5467 289.43 63.5867 286.257 64.36C286.897 65.5867 287.977 66.2 289.497 66.2C290.59 66.2 291.484 65.9467 292.177 65.44C292.897 64.9333 293.724 64.08 294.657 62.88C294.977 62.48 295.337 62.28 295.737 62.28ZM289.177 55.28C288.19 55.28 287.35 55.8533 286.657 57C285.99 58.1467 285.657 59.5333 285.657 61.16V61.24C287.23 60.8667 288.47 60.3067 289.377 59.56C290.284 58.8133 290.737 57.9467 290.737 56.96C290.737 56.4533 290.59 56.0533 290.297 55.76C290.03 55.44 289.657 55.28 289.177 55.28Z" fill="#4A7BFA"/>
                            <circle cx="131.5" cy="52.5" r="52.5" fill="#FFF1A9"/>
                            <circle cx="131.5" cy="52.5" r="47.5" fill="#FFE660"/>
                            <circle cx="131.5" cy="52.5" r="42.5" fill="#FFD600"/>
                            <path d="M112.809 33.7959C112.917 32.2219 114.225 31 115.802 31H147.198C148.775 31 150.083 32.2219 150.191 33.7959L152.782 71.7959C152.9 73.5291 151.526 75 149.788 75H113.212C111.474 75 110.1 73.5291 110.218 71.7959L112.809 33.7959Z" fill="black"/>
                            <path d="M123 32.5746C123 52.3219 139 52.8257 139 32.5746" stroke="white" strokeWidth="3" strokeLinecap="square"/>
                        </svg>
                    </a>
                </Link>
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