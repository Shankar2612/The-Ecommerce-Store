import React from 'react'
import styles from "../styles/AlertComponent.module.scss"
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function AlertComponent(props) {

    const handleClose = () => {
        props.close(false);
    }

    const position = {
        vertical: 'top',
        horizontal: 'center',
    }

    return (
        <div>
            <Snackbar anchorOrigin={position} open={props.open} autoHideDuration={6000} onClose={handleClose} key={position.vertical + position.horizontal}>
                <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
