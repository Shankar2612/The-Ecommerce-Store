import React, {useState} from 'react'
import {useRouter} from 'next/router'
import Head from "next/head"
import docToObj from "../utils/docToObj";
import Navbar from "../components/Navbar";
import BlackScreen from '../components/BlackScreen'
import styles from "../styles/SearchScreen.module.scss"
import SearchFilterBar from '../components/SearchFilterBar';
import Sidebar from '../components/Sidebar';
import AlertComponent from '../components/AlertComponent';
import {setCart, userLogout} from "../utils/actions"
import {connect} from "react-redux"
import ProductCard from '../components/ProductCard';
import Product from '../models/Product';

const mapStateToProps = (state) => {
    return {
        cart: state.addCartReducer.cart,
        userInfo: state.userAuthReducer.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogout: () => {
            dispatch(userLogout());
            Cookies.remove("userInfo");
            Cookies.remove("cartItems");
        },

        onAddToCart: (product, quantity) => {
            const cartItem = {...product, quantity: quantity};
            dispatch(setCart(cartItem));
        }
    }
}

function SearchScreen(props) {
    const router = useRouter();

    const [sideBar, setSideBar] = useState("none");
    const [blackScreen, setBlackScreen] = useState("none");
    const [sidebarClass, setSidebarClass] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const handleSidebar = () => {
        if(sideBar === "none") {
            setSideBar("sidebar");
            setBlackScreen("enable");
        } else {
            setSideBar("none");
            setBlackScreen("none");
        }
    }

    const userLogout = () => {
        setAlert(true);
        setAlertMessage("User successfully Logged out!!");
        setSeverity("success");
        props.onUserLogout();
    }

    const onHandleTagDelete = (tag) => {
        router.push(`/search?s=${tag === "s" ? "" : router.query.s}&category=${tag !== "category" ? router.query.category : "all"}&subCategory=${tag !== "subCategory" ? router.query.subCategory : "all"}&price=${tag !== "price" ? router.query.price : "all"}&rating=${tag !== "rating" ? router.query.rating : "all"}&brand=${tag !== "brand" ? router.query.brand : "all"}&color=${tag !== "color" ? router.query.color : "all"}`);
    }

    return (
        <div>
            <Head>
                <title>The Ecom Store: {router.query.s}</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <Navbar handleSidebar={handleSidebar} />
            <div className={styles.search}>
                <SearchFilterBar setSidebarClass={setSidebarClass} sidebarOpen={sidebarClass} query={router.query} />
                <div className={styles.searchResults}>
                    <div className={styles.searchTags}>
                        {router.query.s !== "" ? <div className={styles.tag}>
                            <p>{router.query.s}</p>
                            <img onClick={() => onHandleTagDelete("s")} src="https://cdn-icons-png.flaticon.com/128/992/992660.png" alt="close-icon" />
                        </div> : null}
                        {router.query.category !== "all" ? <div className={styles.tag}>
                            <p>{router.query.category}</p>
                            <img onClick={() => onHandleTagDelete("category")} src="https://cdn-icons-png.flaticon.com/128/992/992660.png" alt="close-icon" />
                        </div> : null}
                        {router.query.subCategory !== "all" ? <div className={styles.tag}>
                            <p>{router.query.subCategory}</p>
                            <img onClick={() => onHandleTagDelete("subCategory")} src="https://cdn-icons-png.flaticon.com/128/992/992660.png" alt="close-icon" />
                        </div> : null}
                        {router.query.price !== "all" ? <div className={styles.tag}>
                            <p>{router.query.price}</p>
                            <img onClick={() => onHandleTagDelete("price")} src="https://cdn-icons-png.flaticon.com/128/992/992660.png" alt="close-icon" />
                        </div>: null}
                        {router.query.rating !== "all" ? <div className={styles.tag}>
                            <p>{router.query.rating}</p>
                            <img onClick={() => onHandleTagDelete("rating")} src="https://cdn-icons-png.flaticon.com/128/992/992660.png" alt="close-icon" />
                        </div> : null}
                        {router.query.brand !== "all" ? <div className={styles.tag}>
                            <p>{router.query.brand}</p>
                            <img onClick={() => onHandleTagDelete("brand")} src="https://cdn-icons-png.flaticon.com/128/992/992660.png" alt="close-icon" />
                        </div> : null}
                        {router.query.color !== "all" ? <div className={styles.tag}>
                            <p>{router.query.color}</p>
                            <img onClick={() => onHandleTagDelete("color")} src="https://cdn-icons-png.flaticon.com/128/992/992660.png" alt="close-icon" />
                        </div> : null}
                    </div>
                    <hr />
                    {props.products.length !== 0
                    ? <div className={styles.queryResult}>
                        {props.products.map((product, index) => {
                            return <ProductCard key={index} onAddToCart={props.onAddToCart} product={product} />
                        })}
                    </div>
                    : <div className={styles.emptyQueryResult}>
                        <img src="https://cdn-icons-png.flaticon.com/128/42/42901.png" alt="no-items-icon" />
                        <p>There are currently no items matching your search criteria.</p>
                    </div>}
                </div>
                <div onClick={() => setSidebarClass("open")} className={styles.openSidebar}>
                    <img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="right-icon" />
                </div>
            </div>
            <Sidebar onUserLogout={userLogout} handleSidebar={handleSidebar} sidebarOpen={sideBar} />
            {blackScreen === "none" ? null : <BlackScreen />}
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

export async function getServerSideProps ({query}) {

    const searchFilter = query.s && query.s.length !== 0 ? {$text: {$search: query.s}} : {};
    const categoryFilter = query.category && query.category !== "all" ? {category: query.category} : {};
    const subCategoryFilter = query.subCategory && query.subCategory !== "all" ? {subCategory: query.subCategory} : {};
    const priceFilter = query.price && query.price !== "all" ? {price: {$gte: Number(query.price.split("-")[0]), $lte: Number(query.price.split("-")[1])}} : {};
    const ratingFilter = query.rating && query.rating !== "all" ? {rating: {$gte: Number(query.rating)}} : {};
    const brandFilter = query.brand && query.brand !== "all" ? {brand: query.brand} : {};
    const colorFilter = query.color && query.color !== "all" ? {colors: {$in: [query.color]}} : {};

    await Product.createIndexes({name: "text"});

    const products = await Product.find({...searchFilter, ...categoryFilter, ...subCategoryFilter, ...priceFilter, ...ratingFilter, ...brandFilter, ...colorFilter}).lean();

    return {
        props: {
            products: products.map(product => docToObj(product))
        }
    }    
}