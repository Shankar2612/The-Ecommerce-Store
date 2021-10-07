import React, {useState} from 'react'
import styles from "../styles/SearchFilterBar.module.scss"
import starCounter from '../utils/StarsCounter'
import {colors} from '../utils/colors'
import Link from "next/link"
import { useRouter } from 'next/router'
import AlertComponent from '../components/AlertComponent';

export default function SearchFilterBar(props) {
    // console.log(props.sidebarOpen)
    const router = useRouter();
    const [lowerPrice, setLowerPrice] = useState("");
    const [upperPrice, setUpperPrice] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const handleRoute = (routeQuery) => {
        router.push(`/search?s=${props.query.s}&category=${routeQuery.category ? routeQuery.category : props.query.category !== "all" ? props.query.category : "all"}&subCategory=${routeQuery.subCategory ? routeQuery.subCategory : props.query.subCategory !== "all" ? props.query.subCategory :"all"}&price=${routeQuery.price ? routeQuery.price : props.query.price !== "all" ? props.query.price : "all"}&rating=${routeQuery.rating ? routeQuery.rating : props.query.rating !== "all" ? props.query.rating : "all"}&brand=${routeQuery.brand ? routeQuery.brand : props.query.brand !== "all" ? props.query.brand : "all"}&color=${routeQuery.color ? routeQuery.color : props.query.color !== "all" ? props.query.color : "all"}`);
    }

    const handlePrice = () => {
        if(lowerPrice.length === 0 || upperPrice.length === 0) {
            setAlert(true);
            setAlertMessage("Please specify the Min and Max price");
            setSeverity("error");
        } else if(Number(lowerPrice) < 0) {
            setAlert(true);
            setAlertMessage("Min price cannot be less than 0");
            setSeverity("error");
        } else if(Number(upperPrice) < 0) {
            setAlert(true);
            setAlertMessage("Max price must be greater than 0");
            setSeverity("error");
        } else if(Number(lowerPrice) >= Number(upperPrice)) {
            setAlert(true);
            setAlertMessage("Min price must be lower than Max price");
            setSeverity("error");
        } else {
            handleRoute({price: Number(lowerPrice).toFixed(2).toString()+"-"+Number(upperPrice).toFixed(2).toString()});
            setLowerPrice("");
            setUpperPrice("");
        }
    }

    return (
        <div className={`${styles.searchBar} ${styles[props.sidebarOpen]}`}>
            <div className={styles.close}>
                <img onClick={() => props.setSidebarClass("")} src="https://cdn-icons-png.flaticon.com/128/660/660252.png" alt="close-icon" />
            </div>
            <h4>Category:</h4>
            <ul>
                <li onClick={() => handleRoute({category: "Electronics"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2432/2432572.png" alt="electronics-icon" />
                    <span>Electronics</span>
                </li>
                <li onClick={() => handleRoute({category: "Computers and Hardwares"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2777/2777142.png" alt="computers-icon" />
                    <span>Computers & Hardwares</span>
                </li>
                <li onClick={() => handleRoute({category: "Men Fashion"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1198/1198414.png" alt="men-icon" />
                    <span>Men Fashion</span>
                </li>
                <li onClick={() => handleRoute({category: "Women Fashion"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1198/1198409.png" alt="women-icon" />
                    <span>Women Fashion</span>
                </li>
                <li onClick={() => handleRoute({category: "Kids Fashion"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2086/2086222.png" alt="kids-icon" />
                    <span>Kids Fashion</span>
                </li>
            </ul>
            <h4>Sub Category:</h4>
            <ul>
                <li onClick={() => handleRoute({subCategory: "Camera"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/685/685655.png" alt="camera-icon" />
                    <span>Camera</span>
                </li>
                <li onClick={() => handleRoute({subCategory: "Headphones"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2238/2238074.png" alt="headphones-icon" />
                    <span>Headphones</span>
                </li>
                <li onClick={() => handleRoute({subCategory: "Tablets"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/900/900263.png" alt="tablets-icon" />
                    <span>Tablets</span>
                </li>
                <li onClick={() => handleRoute({subCategory: "Laptops"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/482/482469.png" alt="laptops-icon" />
                    <span>Laptops</span>
                </li>
                <li onClick={() => handleRoute({subCategory: "Printers"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/4305/4305625.png" alt="printers-icon" />
                    <span>Printers</span>
                </li>
                <li onClick={() => handleRoute({subCategory: "Clothing"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/821/821528.png" alt="clothing-icon" />
                    <span>Clothing</span>
                </li>
                <li onClick={() => handleRoute({subCategory: "Shoes"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/866/866692.png" alt="shoes-icon" />
                    <span>Shoes</span>
                </li>
                <li onClick={() => handleRoute({subCategory: "Watches"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/878/878954.png" alt="watches-icon" /> 
                    <span>Watches</span>
                </li>
                <li onClick={() => handleRoute({subCategory: "Handbags"})}>
                    <img src="https://cdn-icons-png.flaticon.com/128/398/398922.png" alt="handbags-icon" />
                    <span>Handbags</span>
                </li>
            </ul>
            <h4>Price in(₹):</h4>
            <div className={styles.priceInputDiv}>
                <div className={styles.priceInput}>
                    <input placeholder="0.00" value={lowerPrice} onChange={(e) => setLowerPrice(e.target.value)} type="number" />
                    <span>-</span>
                    <input placeholder="0.00" value={upperPrice} onChange={(e) => setUpperPrice(e.target.value)} type="number" />
                </div>
                <button onClick={handlePrice} type="button">Search</button>
            </div>
            <h4>Rating:</h4>
            <ul className={styles.rating}>
                <li onClick={() => handleRoute({rating: "4"})}>
                    {starCounter(4)} <span>& up</span>
                </li>
                <li onClick={() => handleRoute({rating: "3"})}>
                    {starCounter(3)} <span>& up</span>
                </li>
                <li onClick={() => handleRoute({rating: "2"})}>
                    {starCounter(2)} <span>& up</span>
                </li>
                <li onClick={() => handleRoute({rating: "1"})}>
                    {starCounter(1)} <span>& up</span>
                </li>
            </ul>
            <h4>Brand:</h4>
            <ul className={styles.brand}>
                <li onClick={() => handleRoute({brand: "Sony"})}>Sony</li>
                <li onClick={() => handleRoute({brand: "Nikon"})}>Nikon</li>
                <li onClick={() => handleRoute({brand: "Samsung"})}>Samsung</li>
                <li onClick={() => handleRoute({brand: "MEBERRY"})}>MEBERRY</li>
                <li onClick={() => handleRoute({brand: "Seagate"})}>Seagate</li>
                <li onClick={() => handleRoute({brand: "Lenovo"})}>Lenovo</li>
                <li onClick={() => handleRoute({brand: "Canon"})}>Canon</li>
                <li onClick={() => handleRoute({brand: "Champion"})}>Champion</li>
                <li onClick={() => handleRoute({brand: "Adidas"})}>Adidas</li>
                <li onClick={() => handleRoute({brand: "Fossil"})}>Fossil</li>
                <li onClick={() => handleRoute({brand: "Chandrakala"})}>Chandrakala</li>
                <li onClick={() => handleRoute({brand: "Mad Over Shopping"})}>Mad Over Shopping</li>
                <li onClick={() => handleRoute({brand: "The Children's Place"})}>The Children&apos;s Place</li>
                <li onClick={() => handleRoute({brand: "MdnMd"})}>MdnMd</li>
                <li onClick={() => handleRoute({brand: "Nike"})}>Nike</li>
            </ul>
            <h4>Color:</h4>
            <div className={styles.color}>
                {colors.map((color, index) => {
                    return <div key={index} style={{backgroundColor: color}} onClick={() => handleRoute({color: color})} className={styles.colorPallete}></div>
                })}
            </div>
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}
