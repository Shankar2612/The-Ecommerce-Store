import React, {useState} from 'react';
import styles from "../styles/AddAddressModal.module.scss";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Cookies from 'js-cookie';
import AlertComponent from '../components/AlertComponent';

export default function AddAddressModal(props) {
    const [name, setName] = useState(props.name);
    const [mobile, setMobile] = useState(props.address ? props.address.mobile : "");
    const [address, setAddress] = useState(props.address ? props.address.address : "");
    const [locality, setLocality] = useState(props.address ? props.address.locality : "");
    const [pincode, setPincode] = useState(props.address ? props.address.pinCode : "");
    const [city, setCity] = useState(props.address ? props.address.city : "");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const [addAddressLoading, setAddAddressLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const getPincodeDetails = () => {
        if(pincode.length === 0) {
            setAlert(true);
            setAlertMessage("Please Enter the Pincode.");
            setSeverity("error");
            setPincode("");
        } else if(pincode.length > 6) {
            setAlert(true);
            setAlertMessage("Pincode must be six digits long");
            setSeverity("error");
            setPincode("");
        } else if(pincode.toString().includes(".")) {
            setAlert(true);
            setAlertMessage("Pincode is not valid. Please enter correct pincode.");
            setSeverity("error");
            setPincode("");
        } else {
            setLoading(true);
            axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(res => {
                if(res.data[0].Status === "Error") {
                    setAlert(true);
                    setAlertMessage("Invalid Pincode!!");
                    setSeverity("error");
                    setLoading(false);
                }  else {
                    setLoading(false);
                    const {District, State, Country} = res.data[0].PostOffice[0];

                    setDistrict(District);
                    setState(State);
                    setCountry(Country);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
        }
    }

    const handleAddressSubmit = () => {
        if(name.length === 0) {
            setAlert(true);
            setAlertMessage("Please enter your name");
            setSeverity("error");
        } else if(mobile.toString().length === 0) {
            setAlert(true);
            setAlertMessage("Please enter your mobile number");
            setSeverity("error");
        } else if(mobile.toString().includes(".") || mobile.toString().length !== 10){
            setAlert(true);
            setAlertMessage("Please enter correct mobile no");
            setSeverity("error");
            setMobile("");
        } else if(address.length === 0) {
            setAlert(true);
            setAlertMessage("Please enter your address");
            setSeverity("error");
        } else if(locality.length === 0) {
            setAlert(true);
            setAlertMessage("Please enter your locality");
            setSeverity("error");
        } else if(district.length === 0) {
            setAlert(true);
            setAlertMessage("Please click on Get Details button to get the pincode details.");
            setSeverity("error");
        } else if(city.length === 0) {
            setAlert(true);
            setAlertMessage("Please enter your city");
            setSeverity("error");
        } else {
            setAddAddressLoading(true);
            axios.post("/api/address", {name: name, mobile: mobile, city: city, address: address, locality: locality, pincode: pincode, district: district, state: state, country: country})
            .then(res => {
                Cookies.remove("userAddress");
                Cookies.set("userAddress", JSON.stringify({name: name, mobile: mobile, city: city, address: address, locality: locality, pincode: pincode, district: district, state: state, country: country}));
                props.setAddress({name: name, mobile: mobile, city: city, address: address, locality: locality, pincode: pincode, district: district, state: state, country: country})
                setAddAddressLoading(false);

                if(res.data.response.modifiedCount === 1) {
                    setAlert(true);
                    setAlertMessage("Your Address has been updated successfully.");
                    setSeverity("success");
                } else {
                    setAlert(true);
                    setAlertMessage("Your Address has been added in our database successfully.");
                    setSeverity("success");
                }
                window.location.reload();
            }) 
            .catch(err => {
                console.log(err);
                setAddAddressLoading(false);
            })
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalBar}>
                <h1>Add Shipping Address</h1>
                <img onClick={() => props.handleAddressCard()} src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png" alt="close-icon" />
            </div>
            <div className={styles.modalBody}>
                <p>Name*</p>
                <input value={name} type="text" placeholder="Name*" readOnly />
                <p>Mobile No*</p>
                <input onChange={(e) => setMobile(e.target.value)} value={mobile} type="number" placeholder="Mobile No*" />
                <p>Address*</p>
                <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="Address*" />
                <p>Locality*</p>
                <input onChange={(e) => setLocality(e.target.value)} value={locality} type="text" placeholder="Locality*" />
                <p>City*</p>
                <input onChange={(e) => setCity(e.target.value)} value={city} type="text" placeholder="City*" />
                <p>Pincode*</p>
                <input onChange={(e) => setPincode(e.target.value)} value={pincode} type="number" placeholder="Pincode*" />
                <div className={styles.getPinDetails}>
                    <button onClick={() => getPincodeDetails()} type="button">Get Details</button>
                    {loading 
                    ? <Stack sx={{ color: 'red' }} spacing={2} direction="row">
                        <CircularProgress size={25} color="inherit" />
                    </Stack> 
                    : null}
                </div>
                <p>District*</p>
                <input value={district} type="text" placeholder="District*" readOnly />
                <p>State*</p>
                <input value={state} type="text" placeholder="State*" readOnly />
                <p>Country*</p>
                <input value={country} style={{marginBottom: 0}} type="text" placeholder="Country*" readOnly />
            </div>
            <div className={styles.modalConfirmAddress}>
                {addAddressLoading 
                ? <Stack sx={{ color: 'red' }} spacing={2} direction="row">
                        <CircularProgress size={30} color="inherit" />
                </Stack> 
                : <button onClick={() => handleAddressSubmit()} type="button">ADD ADDRESS</button>}
            </div>
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}
