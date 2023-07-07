import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@mui/material/InputLabel';
import { tokens } from '../../Global'
import { Box, Button, FormControl, MenuItem, Select, Typography, useTheme } from '@material-ui/core';
import { Send } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer/Footer';
import { useFormik } from 'formik'
import { complaintSchema, meterSchema } from '../../ValidateSchema/Services';
import { useDispatch, useSelector } from 'react-redux';
import { CompReq } from '../../Action/Services/Services';

import avatar from '../../Images/Avatar.jpg'
import axios from 'axios';

const useStyles = makeStyles({
    Complaint: {
        width: "98.9vw",
        height: "50vh",
        paddingTop: "4rem",
        background: "linear-gradient(to top right ,rgb(48, 94, 234),rgb(214, 245, 214))",
        backgroundSize: "cover",

    },
    box: {
        width: "80%",
        margin: "4rem auto",
        backgroundColor: "white",
        boxShadow: "3px 3px 6px ",
        borderRadius: "10px",
        border: " solid 1px black"

    },
    compField: {
        padding: '2rem'
    },
    userField: {
        padding: '2rem',
        backgroundColor: "gray",
        borderRadius: "0 0 10px 10px",
    },

    fullInput: {
        width: "71%",
        marginBottom: "10px"

    },

    dropdown: {
        width: "71%",
        marginBottom: "15px",

    },
    button: {
        width: "71%"
    },
    error: {
        color: "red",
        marginBottom: "10px"
    },
    label: {
        marginTop: "15px"
    }
});

const MeterApply = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [image, setImage] = useState();

    const hnadleFile = (e) => {
        const file = e.target.files[0]
        setFile(file)

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }



    const initialvalues = {
    }
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({

        initialValues: initialvalues,
        validationSchema: meterSchema,

        onSubmit: (values) => {
            try {
                if (file) {
                    const formData = new FormData()
                    formData.append("file", file)
                    formData.append('data', JSON.stringify(values));

                    axios.post('/api/meterreq', formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                    })
                        navigate('/')

                    return
                }
                alert("please select file")
            } catch (error) {

            }
        }


    })


    const classes = useStyles();
    return (


        <div className={classes.Complaint}>
            <form onSubmit={handleSubmit} className={classes.box}  encType="multipart/form-data">

                <div className={classes.compField}>
                    <Typography variant="h4" sx={{ marginBottom: "20px" }} color="initial">Apply Meter</Typography>
                    <Typography variant="h6" color="initial">Name</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter First Name '
                        variant='outlined'
                        size='small'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {errors.name && touched.name ? (
                        <Typography className={classes.error}   >{errors.name}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">Email</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Enter Your Email '
                        variant='outlined'
                        size='small'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {errors.email && touched.email ? (
                        <Typography className={classes.error}   >{errors.email}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">Mobile No.</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Enter Your phone no '
                        variant='outlined'
                        size='small'
                        name='phone'
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    {errors.phone && touched.phone ? (
                        <Typography className={classes.error}   >{errors.phone}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">Meter Type</Typography>
                    <FormControl className={classes.fullInput}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.meterType}
                            onChange={handleChange}
                            name="meterType"
                        >
                            <MenuItem value={"WaterMeter"}>Water Meter</MenuItem>
                            <MenuItem value={"GasMeter"}>Gas Meter</MenuItem>
                            <MenuItem value={"ElectricityMeter"}>Electricity Meter</MenuItem>
                        </Select>
                    </FormControl>


                    {errors.meterType && touched.meterType ? (
                        <Typography className={classes.error}   >{errors.meterType}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">Tenament No</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='tenament No'
                        variant='outlined'
                        size='small'
                        name='tenamentNo'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tenament_No}
                    />
                    {errors.tenamentNo && touched.tenamentNo ? (
                        <Typography className={classes.error} >{errors.tenamentNo}</Typography>
                    ) : null}

                    <Typography variant="h6" color="initial">Address</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='City'
                        variant='outlined'
                        size='small'
                        name='city'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                    />
                    {errors.city && touched.city ? (
                        <Typography className={classes.error} >{errors.city}</Typography>
                    ) : null}


                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Street Address '
                        variant='outlined'
                        size='small'
                        name='streetAddress'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.streetAddress}


                    />
                    {errors.streetAddress && touched.streetAddress ? (
                        <Typography className={classes.error} >{errors.streetAddress}</Typography>
                    ) : null}

                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Area Name '
                        variant='outlined'
                        size='small'
                        name='area'
                        onChange={handleChange}
                        value={values.area}
                        onBlur={handleBlur}
                    />
                    {errors.area && touched.area ? (
                        <Typography className={classes.error} >{errors.area}</Typography>
                    ) : null}
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='pincode No. '
                        variant='outlined'
                        size='small'
                        name='pincodeNo'
                        onChange={handleChange}
                        value={values.pincode}
                        onBlur={handleBlur}
                    />
                    {errors.pincodeNo && touched.pincodeNo ? (
                        <Typography className={classes.error} >{errors.pincodeNo}</Typography>
                    ) : null}

                    <Typography variant="h6" color="initial">Upload Document</Typography>
                    <div className="row">
                        <div className="col-sm-6 mt-2 mb-2">
                            <input type="file" className='input-upload' onChange={hnadleFile} name="" id="" />
                        </div>
                        <div className="col-sm-6 mt-1 mb-2" >
                            <img style={{ width: "10rem" }} src={image} alt="" />

                        </div>



                    </div>

                    <Button type='submit' color='primary' className={classes.button} variant="contained" endIcon={<Send />}>
                       Apply
                    </Button>
                </div>

            </form>

            <Footer />
        </div>
    )
}

export default MeterApply
