import React from 'react'
import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'
import { tokens } from '../../Global'
import Loader from './AdminLoader'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Global/Header'
import { Box, FormControl, InputAdornment, InputLabel, Select, TextField, Typography, useTheme, MenuItem, Button } from '@mui/material'
import { useFormik } from 'formik'
import { AddHomeTwoTone, AttachMoneyTwoTone, EditRoadTwoTone, LocalPhoneTwoTone, PeopleAltTwoTone } from '@mui/icons-material'
import { useEffect } from 'react'
import { Getbillcat } from '../../Action/Admin/Categories'
import * as yup from 'yup'
import { AddBill } from '../../Action/Admin/Bills'
import { useNavigate } from 'react-router-dom'
import AdminAuth from '../ProtectedRoute/AdminAuth'

const Bills = () => {
    const navigate = useNavigate()
    const { getbillcat } = useSelector((state) => (state.services))
    const themes = useTheme()

    const initialvalue = {
        billType: "",
        ownerName: "",
        tenamentNo: "",
        streetAddress: "",
        area: "",
        amount: ""
    }
    const validationSchema = yup.object().shape({
        billType: yup.string().required("!! Please Select Bills Type"),
        ownerName: yup.string().required("!! Please Enter Owner Name"),
        tenamentNo: yup.number().min(100000000000, ['Tenament no must have 12 digit']).max(999999999999, ['Tenament no must have 12 digit']).required(),
        streetAddress: yup.string().required("!! Please Enter streetAddress"),
        area: yup.string().required("!! Please Enter Area"),
        amount: yup.string().required("!! Please Enter Amount"),
    })
    const colors = tokens(themes.palette.mode)
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialvalue,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            dispatch(AddBill(values))
            navigate('/pbills')
        }
    })
    const styles = {
        Box: {

            backgroundColor: colors.primary[600],
            color: "black",
            width: "70%",
            margin: "5px auto",
            padding: "30px 30px",
            borderRadius: "10px", height: "400px", overflow: "auto",
            // boxShadow: "3px 3px 6px",
            // float: "left"


        },
        Box1: {

            backgroundColor: "white",
            color: "black",
            width: "35%",
            // borderRadius: "10px",
            // boxShadow: "3px 3px 6px",
            float: "right"


        },
        img: {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "600px",
            height: "auto",

        },
        main: {
            backgroundColor: "white",
            color: "black",
            width: "70%",
            margin: " 2rem auto",
            padding: "20px 30px",
            borderRadius: "10px",
            boxShadow: "3px 3px 6px",




        },
        textfield: {

            width: "100%",
            margin: "10px auto",
            padding: "5px auto",

        },
        icon: {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            height: "auto"
        },
        btn: {
            width: "100%",
            margin: "10px auto",
            borderRadius: "100px"
        },
        link: {
            color: "blue",
            fontSize: "15px",
            margin: "2px 0px",
            textDecoration: "none",
        },
        gender: {
            margin: "0px 0px 0px 0px",

        },

    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(Getbillcat())
    }, [dispatch])



    return (
        <div className='app'>
            <AdminSidebar />
            <main className='content'>
                <AdminTopbar />
                <Box m="15px" >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="Add Bills" subtitle="Welcome To Add Bills Page" />

                    </Box>
                    <Box justifyContent="center" alignItems="center" display="flex">
                        <Box sx={styles.Box} >
                            <form onSubmit={handleSubmit}>
                                <Typography variant="h3" sx={{ marginBottom: "20px" }} color="initial">New Bill</Typography>
                                <FormControl fullWidth variant="standard" sx={{ marginBottom: "2rem" }} InputLabelProps={{ style: { fontSize: 20 } }} size="small">
                                    <InputLabel>Bill Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="billType"
                                        label="Bills Type"
                                        // value={dept}
                                        value={values.billType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                        placeholder="select Bill Type"
                                    >
                                        {
                                            getbillcat?.map((data) => (
                                                <MenuItem value={data.billsType}>{data.billsType}</MenuItem>
                                            ))
                                        }


                                    </Select>
                                </FormControl>
                                {errors.billType && touched.billType ? (
                                    <Typography color="crimson"   >{errors.billType}</Typography>
                                ) : null}
                                <TextField
                                    name="ownerName"
                                    label="Owner Name"
                                    sx={styles.textfield}
                                    value={values.ownerName}
                                    type="text"
                                    variant='standard'
                                    placeholder='Enter Owner Name'
                                    color='secondary'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <PeopleAltTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                {errors.ownerName && touched.ownerName ? (
                                    <Typography color="crimson"   >{errors.ownerName}</Typography>
                                ) : null}
                                <TextField
                                    name="tenamentNo"
                                    label="Tenament No."
                                    sx={styles.textfield}
                                    type="number"
                                    variant='standard'
                                    placeholder='Enter Tenament No.'
                                    color='secondary'
                                    value={values.tenamentNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <AddHomeTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                {errors.tenamentNo && touched.tenamentNo ? (
                                    <Typography color="crimson"   >{errors.tenamentNo}</Typography>
                                ) : null}
                                <TextField
                                    name="streetAddress"
                                    label="Street Address"
                                    sx={styles.textfield}
                                    type="text"
                                    variant='standard'
                                    placeholder='Enter Street Address'
                                    color='secondary'
                                    value={values.streetAddress}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <EditRoadTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                {errors.streetAddress && touched.streetAddress ? (
                                    <Typography color="crimson"   >{errors.streetAddress}</Typography>
                                ) : null}
                                <TextField
                                    name="area"
                                    label="Area"
                                    sx={styles.textfield}
                                    type="text"
                                    variant='standard'
                                    placeholder='Enter Area'
                                    color='secondary'
                                    onChange={handleChange}
                                    value={values.area}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <EditRoadTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                {errors.area && touched.area ? (
                                    <Typography color="crimson"   >{errors.area}</Typography>
                                ) : null}
                                <TextField
                                    name="amount"
                                    label="Amount"
                                    sx={styles.textfield}
                                    type="number"
                                    variant='standard'
                                    placeholder='Enter Amount'
                                    color='secondary'
                                    value={values.amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"> <AttachMoneyTwoTone color='secondary' /></InputAdornment>)
                                    }}

                                />
                                {errors.amount && touched.amount ? (
                                    <Typography color="crimson"   >{errors.amount}</Typography>
                                ) : null}
                                <Button type="submit" sx={styles.btn} variant="contained" color="secondary" >
                                    Upload
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </main>
        </div>
    )
}

export default AdminAuth(Bills)