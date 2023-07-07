import React from 'react'
import {CircularProgress  } from '@material-ui/core'
import Box from '@mui/material/Box';
import { makeStyles, } from '@material-ui/core';

const useStyle = makeStyles({
    box: {
        // height:"100vh",
        // display:"grid",
        // placeItems:"center",
        // backgroundColor:'white'
        margin: "120px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },

    img: {
    }
})
const AdminLoader = () => {
    const styles = useStyle();
    return (
        <Box className={styles.box}>
            <CircularProgress className={styles.box} />
        </Box>
    )
}

export default AdminLoader