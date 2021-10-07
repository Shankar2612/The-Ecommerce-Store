import React from 'react'
import styles from "../styles/AddressCard.module.scss"

export default function AddressCard(props) {
    if(props.handleSelectAddress) {
        return (
            <div onClick={() => props.handleSelectAddress()} className={styles.addressCard}>
                {props.onAddressSelect ? <img src="https://cdn-icons-png.flaticon.com/128/711/711239.png" alt="tick-icon" /> : <div className={styles.radio}></div>}
                <div className={styles.addressInfo}>
                    <h4>{props.address.name}</h4>
                    <p>{props.address.address}, Dist- {props.address.district}, Pin- {props.address.pinCode || props.address.pincode}, {props.address.state}, {props.address.country}</p>
                    <p>Mobile: <span>{props.address.mobile}</span></p>
                    {props.handleAddressCard ? <button onClick={() => props.handleAddressCard()} type="button">EDIT</button> : null}
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.addressCard}>
                <img src="https://cdn-icons-png.flaticon.com/128/711/711239.png" alt="tick-icon" />
                <div className={styles.addressInfo}>
                    <h4>{props.address.name}</h4>
                    <p>{props.address.address}, Dist- {props.address.district}, Pin- {props.address.pinCode || props.address.pincode}, {props.address.state}, {props.address.country}</p>
                    <p>Mobile: <span>{props.address.mobile}</span></p>
                    {props.handleAddressCard ? <button onClick={() => props.handleAddressCard()} type="button">EDIT</button> : null}
                </div>
            </div>
        )
    }
}

