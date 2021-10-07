import React, {useEffect, useState} from 'react'
import styles from "../../styles/ProductsAdminScreen.module.scss"
import Head from "next/head"
import DashboardSidebar from '../../components/DashboardSidebar'
import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardWeatherComponent from '../../components/DashboardWeatherComponent';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Product from "../../models/Product";
import convertDocToObj from '../../utils/docToObj';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import BlackScreen from '../../components/BlackScreen'
import AddProductModal from '../../components/AddProductModal'
import AlertComponent from '../../components/AlertComponent'

const mapStateToProps = (state) => {
    return {
      userInfo: state.userAuthReducer.userInfo
    }
  }

function ProductsAdminScreen(props) {
    const [actionCard, setActionCard] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [addProductModal, setAddProductModal] = useState(false);
    const [productName, setProductName] = useState("");
    const [productFromServer, setProductFromServer] = useState([]);
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

    const openActionCard = (name) => {
        if(actionCard === "") {
            setActionCard(name);
        } else {
            setActionCard("");
        }
    }

    const onDeleteProduct = (id) => {
        setDeleteLoading(true);
        axios.post("/api/deleteProduct", {
            productID: id
        })
        .then(res => {
            setDeleteLoading(false);
            setActionCard("");
            setAlert(true);
            setAlertMessage(res.data.message);
            setSeverity("success");
            window.location.reload();
        })
        .catch(err => {
            setDeleteLoading(false);
            setActionCard("");
            setAlert(true);
            setAlertMessage(err);
            setSeverity("error");
        })
    }

    const openAddProductModal = () => {
        if(addProductModal) {
            setAddProductModal(false);
        } else {
            setAddProductModal(true);
        }
    }

    const searchForProduct = (name) => {
        setProductName(name);
        axios.post("/api/searchProduct", {productName: name})
        .then(res => {
            setProductFromServer(res.data.data);
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Head>
                <title>React Webshop: ADMIN PRODUCTS</title>

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
                <DashboardSidebar pageView={"products"} />
                <div className={styles.ordersPageMain}>
                    <DashboardNavbar />
                    <div className={styles.dashboardArea}>
                        <DashboardWeatherComponent />
                        <div className={styles.ordersHeadingSearch}>
                            <h2>Products</h2>
                            <div className={styles.addProductSearch}>
                                <button onClick={() => openAddProductModal()} className={styles.addProductBtn} type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        width="17" height="17"
                                        viewBox="0 0 172 172"
                                        style={{fill: "#000000"}}>
                                        <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}>
                                            <path d="M0,172v-172h172v172z" fill="none"></path>
                                            <g fill="#ffffff">
                                                <path d="M85.83203,17.04323c-6.32845,0.09274 -11.38527,5.2949 -11.2987,11.62344v45.86667h-45.86667c-4.13529,-0.05848 -7.98173,2.11417 -10.06645,5.68601c-2.08471,3.57184 -2.08471,7.98948 0,11.56132c2.08471,3.57184 5.93115,5.74449 10.06645,5.68601h45.86667v45.86667c-0.05848,4.13529 2.11417,7.98173 5.68601,10.06645c3.57184,2.08471 7.98948,2.08471 11.56132,0c3.57184,-2.08471 5.74449,-5.93115 5.68601,-10.06645v-45.86667h45.86667c4.13529,0.05848 7.98173,-2.11417 10.06645,-5.68601c2.08471,-3.57184 2.08471,-7.98948 0,-11.56132c-2.08471,-3.57184 -5.93115,-5.74449 -10.06645,-5.68601h-45.86667v-45.86667c0.04237,-3.09747 -1.17017,-6.08033 -3.36168,-8.26973c-2.1915,-2.18939 -5.17553,-3.39907 -8.27296,-3.35371z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <p>Add product</p>
                                </button>
                                <div className={styles.ordersSearch}>
                                    <input onChange={(e) => searchForProduct(e.target.value)} value={productName} type="text" placeholder="Search by Product name" />
                                    <img src="https://cdn-icons-png.flaticon.com/128/622/622669.png" alt="search-icon" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.ordersTable}>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{width: 50}}>Sl No.</th>
                                        <th>Product</th>
                                        <th>Product ID</th>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Brand</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {productName.length === 0 
                                ? props.products.map((product, index) => {
                                        return <tr key={index}>
                                            <td style={{fontWeight: 500}}>{index+1}.</td>
                                            <td style={{textAlign: "left"}}>{product.name.substring(0,20)}...</td>
                                            <td>{product._id}</td>
                                            <td>{product.category}</td>
                                            <td>{product.subCategory}</td>
                                            <td>{product.stock}</td>
                                            <td>₹{product.price}</td>
                                            <td>{product.discount}%</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <img className={styles.menuIcon} onClick={() => openActionCard(product.name)} src="https://cdn-icons-png.flaticon.com/128/2089/2089792.png" alt="action-icon" />
                                                {actionCard === product.name 
                                                ? <div className={styles.actionCard}>
                                                    <div className={styles.actionCardEdit}>
                                                        <img src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png" alt="edit-icon" />
                                                        <p>Edit Product Details</p>
                                                    </div>
                                                    {deleteLoading 
                                                    ? <CircularProgress style={{ color: "red", margin: "5px auto"}} size={20} />
                                                    : <div onClick={() => onDeleteProduct(product._id)} style={{marginBottom: 0}} className={styles.actionCardEdit}>
                                                        <img style={{width: 17}} src="https://cdn-icons-png.flaticon.com/128/812/812853.png" alt="delete-icon" />
                                                        <p style={{color: "red"}}>Delete Product</p>
                                                    </div>}
                                                </div> 
                                                : null}
                                            </td>
                                        </tr>
                                })
                                : productFromServer.length === 0
                                    ? <td>No Order Found!!</td>
                                    : productFromServer.map((product, index) => {
                                        return <tr key={index}>
                                            <td style={{fontWeight: 500}}>{index+1}.</td>
                                            <td style={{textAlign: "left"}}>{product.name.substring(0,20)}...</td>
                                            <td>{product._id}</td>
                                            <td>{product.category}</td>
                                            <td>{product.subCategory}</td>
                                            <td>{product.stock}</td>
                                            <td>₹{product.price}</td>
                                            <td>{product.discount}%</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <img className={styles.menuIcon} onClick={() => openActionCard(product.name)} src="https://cdn-icons-png.flaticon.com/128/2089/2089792.png" alt="action-icon" />
                                                {actionCard === product.name 
                                                ? <div className={styles.actionCard}>
                                                    <div className={styles.actionCardEdit}>
                                                        <img src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png" alt="edit-icon" />
                                                        <p>Edit Product Details</p>
                                                    </div>
                                                    {deleteLoading 
                                                    ? <CircularProgress style={{ color: "red", margin: "5px auto"}} size={20} />
                                                    : <div onClick={() => onDeleteProduct(product._id)} style={{marginBottom: 0}} className={styles.actionCardEdit}>
                                                        <img style={{width: 17}} src="https://cdn-icons-png.flaticon.com/128/812/812853.png" alt="delete-icon" />
                                                        <p style={{color: "red"}}>Delete Product</p>
                                                    </div>}
                                                </div> 
                                                : null}
                                            </td>
                                        </tr>
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {addProductModal ? <BlackScreen /> : null}
            {addProductModal ? <AddProductModal openAddProductModal={openAddProductModal} /> : null}
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}

export default connect(mapStateToProps)(ProductsAdminScreen);

export async function getServerSideProps(context) {
    
    const products = await Product.find({}).lean();

    return {
        props: {
            products: products.map(product => convertDocToObj(product))
        }
    }
}