import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { tokens } from '../../Global'
import { Box, Button, FormControl, MenuItem, Select, Typography, useTheme } from '@material-ui/core';
import { Send } from '@mui/icons-material';
import Footer from '../Layout/Footer/Footer';
import { useFormik } from 'formik'
import { complaintSchema } from '../../ValidateSchema/Services';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from '../../Action/User';
import Loader from '../Layout/Loader'
import { CompReq } from '../../Action/Services/Services';
import axios from 'axios';
import { useAlert } from 'react-alert'
import { getUser } from '../../Action/Admin/User';
import { Getdept } from '../../Action/Admin/Categories';
import {useNavigate  } from 'react-router-dom'

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
    backgroundColor: "rgb(0,0,0,0.1)",
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

const Complaint = () => {

  const navigate = useNavigate()
  const { userData, userLoading, isAuthenticated } = useSelector(state => state.user)
  const { getdept, data, error } = useSelector((state) => (state.services))
  const themes = useTheme()
  const colors = tokens(themes.palette.mode)
  const alert = useAlert();
  const [user, setUser] = useState({
    email: "",
    name: "",
    phone: ""
  })
  useEffect(() => {
    data ? alert.success(data.message) : null
    data ? navigate('/') : null
    dispatch({
      type: "CompReqClear"
    })
  }, [error, data]);


  useEffect(() => {
    if (data) {
      alert.success(data.message)
      // dispatch({ type: "ClearLoginMessage" })
  }
  if (error) {
      alert.error(error.message)
      // dispatch({ type: "ClearLoginMessage" })
  }
  }, [data,error])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Getdept())

    userData ? setUser({
      email: userData.email,
      phone: userData.phone,
      name: userData.name
    }) : null
  }, [userData]);


  const initialvalues = {
    complaintType: "",
    city: "",
    streetAddress: "",
    area: "",
    pincode: "",
    complaintDesc: "",
  }
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues: initialvalues,
    validationSchema: complaintSchema,

    onSubmit: (values) => {
      dispatch(CompReq(user, values))
    }
  })


  const classes = useStyles();
  return (


    <div className={classes.Complaint}>
      <form onSubmit={handleSubmit} className={classes.box} >

        <div className={classes.compField}>
          <Typography variant="h4" sx={{ marginBottom: "20px" }} color="initial">New Complaint</Typography>
          <Typography variant="h6" color="initial">Complaint Type</Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.complaintType}
              label="Age"
              onChange={handleChange}
              name="complaintType"
            >
              {
                getdept?.map((data) => (
                  <MenuItem value={data.deptType}>{data.deptType}</MenuItem>
                ))
              }

            </Select>
          </FormControl>


          {errors.complaintType && touched.complaintType ? (
            <Typography className={classes.error}   >{errors.complaintType}</Typography>
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
            placeholder='Zip No. '
            variant='outlined'
            size='small'
            name='pincode'
            onChange={handleChange}
            value={values.pincode}
            onBlur={handleBlur}
          />
          {errors.pincode && touched.pincode ? (
            <Typography className={classes.error} >{errors.pincode}</Typography>
          ) : null}

          <Typography variant="h6" color="initial">Compplaint Description </Typography>
          <textarea
            style={{ width: "71%", marginBottom: "15px" }}
            name="complaintDesc"
            id="" rows="5"
            value={values.complaintDesc}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.complaintDesc && touched.complaintDesc ? (
            <Typography className={classes.error} >{errors.complaintDesc}</Typography>
          ) : null}
        </div>
        <div className={classes.userField}>
          <hr />
          <Typography variant="h5" color="initial">
            COMPLAINER'S PERSONAL DETAILS
          </Typography>
          <hr />

          <Typography variant="h6" color="initial">Name</Typography>
          <TextField className={classes.fullInput}
            id=""
            placeholder='Enter First Name '
            variant='outlined'
            size='small'
            name='name'
            value={user.name}

          />


          <Typography variant="h6" color="initial">Email</Typography>
          <TextField className={classes.fullInput}
            id=""
            placeholder='Enter Enter Your Email '
            variant='outlined'
            size='small'
            name='email'
            value={user.email}

          />
          <Typography variant="h6" color="initial">Mobile No.</Typography>
          <TextField className={classes.fullInput}
            id=""
            placeholder='Enter Enter Your phone no '
            variant='outlined'
            size='small'
            name='phone'
            value={user.phone}

          />


          <Button type='submit' color='primary' className={classes.button} variant="contained" endIcon={<Send />}>

            Complaint Request
          </Button>
        </div>

      </form>

      <Footer />
    </div>
  )
}

export default Complaint
