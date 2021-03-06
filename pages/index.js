import {useState, useEffect} from "react"
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
import Cookies from "js-cookie"
import axios from "axios"
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack'

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    axios.get("/api/getProducts")
    .then(res => {
      setProducts(res.data);
      setLoading(false);
    })
    .then(err => {
      console.log(err);
      setLoading(false);
    })
  }, [])

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
            <title>The Ecom Store</title>
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
            {loading 
            ? <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Stack sx={{ color: 'red' }} style={{marginTop: 20,}} spacing={2} direction="row">
                  <CircularProgress size={30} color="inherit" />
                </Stack>
            </div>
            : <div>
              <CategoryCard onAddToCart={props.onAddToCart} products={products} category={"Electronics"} />
              <CategoryCard onAddToCart={props.onAddToCart} products={products} category={"Computers and Hardwares"} />
              <CategoryCard onAddToCart={props.onAddToCart} products={products} category={"Men Fashion"} />
              <CategoryCard onAddToCart={props.onAddToCart} products={products} category={"Women Fashion"} />
              <CategoryCard onAddToCart={props.onAddToCart} products={products} category={"Kid Fashion"} />
            </div>}
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

//   const products = await Product.find({}).lean();
//   console.log(products);

//   return {
//     props: {
//         product: products.map(eachProduct => convertDocToObj(eachProduct))
//     },
//   };
// }