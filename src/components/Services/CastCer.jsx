import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Typography, useTheme } from '@material-ui/core';
import { Send } from '@mui/icons-material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer/Footer';
import { useFormik } from 'formik'
import { castValidation } from '../../ValidateSchema/Services';;

import axios from 'axios';
import { margin } from '@mui/system';
import { useAlert } from 'react-alert';

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
        border: " solid 1px black",
        alignItems: "center"

    },
    compField: {
        padding: '2rem',

    },
    userField: {
        padding: '2rem',
        backgroundColor: "gray",
        borderRadius: "0 0 10px 10px",
    },

    fullInput: {
        width: "71%",
        margin: "0px auto 10px auto"

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
const CastCer = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [file2, setFile2] = useState();
    const [image2, setImage2] = useState();

    const handleFile = (e) => {
        const file = e.target.files[0]

        setFile(file)
        console.log("file 1", file)
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }
    const handleFile2 = (e) => {
        const file2 = e.target.files[0]
        setFile2(file2)
        console.log("file 2", file2)
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage2(reader.result)
            }
        }
        reader.readAsDataURL(file2)
    }



    const initialvalues = {
    }

     const ualert = useAlert()
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({

        initialValues: initialvalues,
        validationSchema: castValidation,

        onSubmit: async (values) => {
            try {
                if (file) {
                    const formData = new FormData()
                    formData.append("file", file)
                    formData.append("file2", file2)
                    formData.append('data', JSON.stringify(values));
                    setLoading(true)
                    const { data } = await axios.post('/api/castreq', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    setLoading(false)
                    ualert.success(" Form Submited..")
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
            <form onSubmit={handleSubmit} className={classes.box} encType="multipart/form-data">

                <div className={classes.compField}>
                    <Typography variant="h4" sx={{ marginBottom: "20px" }} color="initial">Apply Caste Certificate</Typography>
                    <Typography variant="h6" color="initial">Name</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your Name '
                        variant='outlined'
                        size='small'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {errors.name && touched.name ? (
                        <Typography className={classes.error} >{errors.name}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">Email</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your Email '
                        variant='outlined'
                        size='small'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {errors.email && touched.email ? (
                        <Typography className={classes.error}   >{errors.email}</Typography>
                    ) : null} <br />
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            onChange={handleChange}
                            name="gender"
                            onBlur={handleBlur}
                            value={values.gender}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    {errors.gender && touched.gender ? (
                        <Typography className={classes.error}   >{errors.gender}</Typography>
                    ) : null}

                    <Typography variant="h6" color="initial">Mobile No.</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your phone no '
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
                    <Typography variant="h6" color="initial">Village</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your Village'
                        variant='outlined'
                        size='small'
                        name='village'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.village}
                    />
                    {errors.village && touched.village ? (
                        <Typography className={classes.error} >{errors.village}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">Tehsil</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your Tehsil'
                        variant='outlined'
                        size='small'
                        name='tehsil'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tehsil}
                    />
                    {errors.tehsil && touched.tehsil ? (
                        <Typography className={classes.error} >{errors.tehsil}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">District</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your District'
                        variant='outlined'
                        size='small'
                        name='district'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.district}
                    />
                    {errors.district && touched.district ? (
                        <Typography className={classes.error} >{errors.district}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">State</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your State'
                        variant='outlined'
                        size='small'
                        name='state'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                    />
                    {errors.state && touched.state ? (
                        <Typography className={classes.error} >{errors.state}</Typography>
                    ) : null}

                    <Typography variant="h6" color="initial">Father Name</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your Father Name'
                        variant='outlined'
                        size='small'
                        name='fatherName'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fatherName}


                    />
                    {errors.fatherName && touched.fatherName ? (
                        <Typography className={classes.error} >{errors.fatherName}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">Mother Name</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your Mother Name'
                        variant='outlined'
                        size='small'
                        name='motherName'
                        onChange={handleChange}
                        value={values.motherName}
                        onBlur={handleBlur}
                    />
                    {errors.motherName && touched.motherName ? (
                        <Typography className={classes.error} >{errors.motherName}</Typography>
                    ) : null}
                    <Typography variant="h6" color="initial">Caste</Typography>
                    <TextField className={classes.fullInput}
                        id=""
                        placeholder='Enter Your Caste'
                        variant='outlined'
                        size='small'
                        name='cast'
                        onChange={handleChange}
                        value={values.cast}
                        onBlur={handleBlur}
                    />
                    {errors.cast && touched.cast ? (
                        <Typography className={classes.error} >{errors.cast}</Typography>
                    ) : null}

                    <Typography variant="h6" color="initial">Uplaod Your Photo</Typography>
                    <div className="row">
                        <div className="col-sm-6 mt-2 mb-2">
                            <input type="file" className='input-upload' onChange={handleFile} name="" id="" />
                        </div>
                        <div className="col-sm-6 mt-1 mb-2" >
                            <img style={{ width: "10rem" }} src={image} alt="" />
                        </div>
                    </div>
                    <Typography variant="h6" color="initial">Uplaod Your Adhar Card</Typography>
                    <div className="row">
                        <div className="col-sm-6 mt-2 mb-2">
                            <input type="file" className='input-upload' onChange={handleFile2} name="" id="" />
                        </div>
                        <div className="col-sm-6 mt-1 mb-2" >
                            <img style={{ width: "10rem" }} src={image2} alt="" />
                        </div>
                    </div>

                    <Button disabled={loading} type='submit' color='primary' className={classes.button} variant="contained" endIcon={<Send />}>
                        Apply
                    </Button>
                </div>

            </form>

            <Footer />
        </div>
    )
}

export default CastCer