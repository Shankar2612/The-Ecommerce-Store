import '../styles/globals.css'
import {Provider} from "react-redux"
import store from '../utils/store'
// import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if(jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);
  return <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
}

export default MyApp
