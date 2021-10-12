import {useState} from "react"
import Head from 'next/head'
import Navbar from '../components/Navbar'
import styles from "../styles/Home.module.scss"
import Carousel from "../components/Carousel"
import CategoryCard from "../components/CategoryCard"
import SignInReminder from "../components/SignInReminder"
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import BlackScreen from '../components/BlackScreen'
import AlertComponent from '../components/AlertComponent'
import {setCart, userLogout} from "../utils/actions"
import {connect} from "react-redux"
import Product from '../models/Product'
import convertDocToObj from '../utils/docToObj'
import Cookies from "js-cookie"
import db from "../utils/db"

const mapStateToProps = (state) => {
  return {
    cart: state.addCartReducer.cart,
    userInfo: state.userAuthReducer.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (product, quantity) => {
      const cartItem = {...product, quantity: quantity};
      dispatch(setCart(cartItem));
    },

    onUserLogout: () => {
      dispatch(userLogout());
      Cookies.remove("userInfo");
      Cookies.remove("cartItems");
      Cookies.remove("userAddress");
    }
  }
}

function Home(props) {
  const [sideBar, setSideBar] = useState("none");
  const [blackScreen, setBlackScreen] = useState("none");
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

  return (
      <div>
          <Head>
            <title>React Webshop</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet" />
          </Head>
          <Navbar handleSidebar={handleSidebar} />
          <div className={styles.mainContainer}>
            <Carousel />
            <div className={styles.spacebtwelements}></div>
            <CategoryCard onAddToCart={props.onAddToCart} products={props.product} category={"Electronics"} />
            <CategoryCard onAddToCart={props.onAddToCart} products={props.product} category={"Computers and Hardwares"} />
            <CategoryCard onAddToCart={props.onAddToCart} products={props.product} category={"Men Fashion"} />
            <CategoryCard onAddToCart={props.onAddToCart} products={props.product} category={"Women Fashion"} />
            <CategoryCard onAddToCart={props.onAddToCart} products={props.product} category={"Kid Fashion"} />
            <div className={styles.spacebtwelements}></div>
            {props.userInfo ? null : <SignInReminder />}
          </div>
          <Footer />
          <Sidebar onUserLogout={userLogout} handleSidebar={handleSidebar} sidebarOpen={sideBar} />
          {blackScreen === "none" ? null : <BlackScreen />}
          <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export async function getServerSideProps() {
//   await db.connect();
//   const product = await Product.find({}).lean();
//   await db.disconnect();

//   return {
//     props: {
//         product: product.map(eachProduct => convertDocToObj(eachProduct)),
//     },
//   };
// }