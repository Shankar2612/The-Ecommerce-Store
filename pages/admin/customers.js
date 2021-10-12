import React, {useEffect, useState} from 'react'
import styles from "../../styles/CustomersAdminScreen.module.scss"
import Head from "next/head"
import DashboardSidebar from '../../components/DashboardSidebar'
import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardWeatherComponent from '../../components/DashboardWeatherComponent';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import User from "../../models/User";
import Address from "../../models/Address";
import convertDocToObj from '../../utils/docToObj';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import AlertComponent from '../../components/AlertComponent'

const mapStateToProps = (state) => {
    return {
      userInfo: state.userAuthReducer.userInfo
    }
  }

function CustomersAdminScreen(props) {
    const [customerName, setCustomerName] = useState("");
    const [customerFromServer, setCustomerFromServer] = useState([]);
    const [addressFromServer, setAddressFromServer] = useState([]);
    const [deleteLoader, setDeleteLoader] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("success");

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

    const searchForCustomer = (name) => {
        setCustomerName(name);
        axios.post("/api/searchCustomer", {customerName: name})
        .then(res => {
            setCustomerFromServer(res.data.customerData);
            setAddressFromServer(res.data.addressData);
        })
        .catch(err => console.log(err))
    }

    const onDeleteCustomer = (name) => {
        setDeleteLoader(name);
        axios.post("/api/deleteUser", {name: name})
        .then(res => {
            window.location.reload();
            setAlert(true);
            setAlertMessage(res.data.message);
            setSeverity("success");
            setDeleteLoader("");
        }) 
        .catch(err => {
            console.log(err);
            setDeleteLoader("");
        })
    }

    return (
        <div>
            <Head>
                <title>The Ecom Store: ADMIN CUSTOMERS</title>

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
                <DashboardSidebar pageView={"customers"} />
                <div className={styles.ordersPageMain}>
                    <DashboardNavbar />
                    <div className={styles.dashboardArea}>
                        <DashboardWeatherComponent />
                        <div className={styles.ordersHeadingSearch}>
                            <h2>Customers</h2>
                            <div className={styles.addProductSearch}>
                                <div className={styles.ordersSearch}>
                                    <input onChange={(e) => searchForCustomer(e.target.value)} value={customerName} type="text" placeholder="Search by Customer name" />
                                    <img src="https://cdn-icons-png.flaticon.com/128/622/622669.png" alt="search-icon" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.ordersTable}>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{width: 50}}></th>
                                        <th style={{textAlign: "left"}}>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Address</th>
                                        <th>Locality</th>
                                        <th>City</th>
                                        <th>District</th>
                                        <th>Pincode</th>
                                        <th>State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {customerName.length === 0 
                                ? props.users.map((user) => {
                                        return props.addresses.map((address, index) => {
                                            if(user.name === address.name) {
                                                return <tr key={index}>
                                                        <td>
                                                            {deleteLoader === user.name ? <CircularProgress style={{ color: "red", margin: "5px auto"}} size={20} /> :<img onClick={() => onDeleteCustomer(user.name)} src="https://cdn-icons-png.flaticon.com/128/812/812853.png" alt="delete-icon" />}
                                                        </td>
                                                        <td style={{textAlign: "left"}}>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{address.mobile}</td>
                                                        <td>{address.address}</td>
                                                        <td>{address.locality}</td>
                                                        <td>{address.city}</td>
                                                        <td>{address.district}</td>
                                                        <td>{address.pinCode}</td>
                                                        <td>{address.state}</td>
                                                    </tr>
                                            } 
                                            {/* else {
                                                return <tr key={index}>
                                                        <td>
                                                            {deleteLoader === user.name ? <CircularProgress style={{ color: "red", margin: "5px auto"}} size={20} /> :<img onClick={() => onDeleteCustomer(user.name)} src="https://cdn-icons-png.flaticon.com/128/812/812853.png" alt="delete-icon" />}
                                                        </td>
                                                        <td style={{textAlign: "left"}}>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                    </tr>
                                            } */}
                                        })
                                })
                                : customerFromServer.length === 0
                                    ? <td>No Customer Found!!</td>
                                    : customerFromServer.map((user, index) => {
                                        if(addressFromServer.length === 0) {
                                            return <tr key={index}>
                                                        <td>
                                                            {deleteLoader === user.name ? <CircularProgress style={{ color: "red", margin: "5px auto"}} size={20} /> :<img onClick={() => onDeleteCustomer(user.name)} src="https://cdn-icons-png.flaticon.com/128/812/812853.png" alt="delete-icon" />}
                                                        </td>
                                                        <td style={{textAlign: "left"}}>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                        <td>-----</td>
                                                    </tr>
                                        } else {
                                            return addressFromServer.map((address, index) => {
                                                return <tr key={index}>
                                                        <td style={{fontWeight: 500}}>
                                                            {deleteLoader === user.name ? <CircularProgress style={{ color: "red", margin: "5px auto"}} size={20} /> :<img onClick={() => onDeleteCustomer(user.name)} src="https://cdn-icons-png.flaticon.com/128/812/812853.png" alt="delete-icon" />}
                                                        </td>
                                                        <td style={{textAlign: "left"}}>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{address.mobile}</td>
                                                        <td>{address.address}</td>
                                                        <td>{address.locality}</td>
                                                        <td>{address.city}</td>
                                                        <td>{address.district}</td>
                                                        <td>{address.pinCode}</td>
                                                        <td>{address.state}</td>
                                                    </tr>
                                            })
                                        }
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}

export default connect(mapStateToProps)(CustomersAdminScreen);

export async function getServerSideProps(context) {
    
    const users = await User.find({}).lean();
    const addresses = await Address.find({}).lean();

    return {
        props: {
            users: users.map(user => convertDocToObj(user)),
            addresses: addresses.map(address => convertDocToObj(address))
        }
    }
}