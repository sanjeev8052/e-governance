import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Loader from '../Layout/Loader'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { TextField, Typography, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, Button, InputAdornment, IconButton, Select, MenuItem, InputLabel } from '@mui/material'
import { LoginRounded, LocalPhoneTwoTone, VisibilityTwoTone, VisibilityOffTwoTone, PasswordTwoTone, Person3TwoTone, EmailTwoTone } from '@mui/icons-material'
import * as Yup from 'yup'
import signup from '../Images/Icons/signup1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../../Action/Employee/register'
import { Getdept } from '../../Action/Admin/Categories'
import { useNavigate } from 'react-router-dom'



const Empregister = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { getdept, loading } = useSelector((state) => (state.services))
  const details = {
    name: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    cpassword: "",
    dept: ""
  }
  const [type, setType] = useState("password")
  const [visible, setVisible] = useState(false)
  const icon = (visible ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />)
  const showclick = () => {
    if (visible === false) {
      setVisible(true)
      setType("text")
    }
    else {
      setVisible(false)
      setType("password")
    }
  }
  const styles = {
    Box: {

      backgroundColor: "white",
      color: "black",
      width: "35%",
      margin: "5px 5px",
      padding: "30px 30px",
      // borderRadius: "10px",
      // boxShadow: "3px 3px 6px",
      float: "left"


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
  const emailpattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    dispatch(Getdept())
  }, [dispatch])


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("!! Please Enter Your Name..").min(5, "!! Too Short..").max(15, "!! Very Long..."),
    email: Yup.string().email("!! Enter a Valid Email").required("!! Please Enter Email.. ").matches(emailpattern, "!! Enter Email Properly"),
    gender: Yup.string().oneOf(["male", "female"], "!! Please Select Gender..").required("!! Please Select Gender.."),
    phone: Yup.number().typeError("!! Please Enter Valid Phone Number..").required("!! Please Enter Phone Number..").positive("A phone number can't start with a minus").integer("A phone number can't include a decimal point").min(10, "Enter 10 Digit Only"),
    password: Yup.string().min(8, "!! Minimum Length Should be 8").required("!! Please Enter Your Password.."),
    cpassword: Yup.string().oneOf([Yup.ref("password")], "Password Not Matched").required("!! Please Enter Your Confirm Password.."),
    dept: Yup.string().required("Select Department")
  })
  const onSubmit = (values, props) => {
    dispatch(Register(values))
    navigate('/emplogin')
  }
  return (
    <>
      {loading ? <Loader /> :
        <Grid container sx={styles.main}>
          <Grid row sx={styles.Box} >
            <Formik initialValues={details} onSubmit={onSubmit} validationSchema={validationSchema}>
              {
                (props) => (
                  <Form>
                    <Typography variant="h3" color="primary" >Sign Up</Typography>

                    <Field as={TextField}
                      sx={styles.textfield}
                      name="name"
                      label="Name"
                      variant='standard'
                      type="text"
                      color='secondary'
                      placeholder='Enter Your Name..'
                      InputLabelProps={{ style: { fontSize: 20 } }}
                      InputProps={{
                        startAdornment: (<InputAdornment position="start"> <Person3TwoTone color='secondary' /></InputAdornment>)
                      }}

                    />
                    <Typography variant="subtitle2" color="crimson">{<ErrorMessage name='name' />}</Typography>
                    <Field as={TextField}
                      sx={styles.textfield}
                      name="email"
                      label="Email"
                      type="email"
                      variant='standard'
                      color='secondary'
                      placeholder='Enter Your Email..'

                      InputLabelProps={{ style: { fontSize: 20 } }}
                      InputProps={{
                        startAdornment: (<InputAdornment position="start"> <EmailTwoTone color='secondary' /></InputAdornment>)
                      }}

                    />
                    <Typography variant="subtitle2" color="crimson">{<ErrorMessage name='email' />}</Typography>
                    <FormControl>
                      <FormLabel id="gender-label" color='secondary' component="legend">Gender</FormLabel>
                      <Field as={RadioGroup} row
                        aria-labelledby="gender"
                        defaultValue="female"
                        name="gender"
                        color='secondary'
                      >
                        <FormControlLabel value="female" control={<Radio color='secondary' />} label="Female" />
                        <FormControlLabel value="male" control={<Radio color='secondary' />} label="Male" />
                      </Field>
                    </FormControl>
                    <Typography variant="subtitle2" color="crimson">{<ErrorMessage name='gender' />}</Typography>

                    <Field as={TextField}
                      name="phone"
                      label="Phone No."
                      sx={styles.textfield}
                      type="number"
                      variant='standard'
                      placeholder='Enter Your Phone No.'
                      color='secondary'
                      InputLabelProps={{ style: { fontSize: 20 } }}
                      InputProps={{
                        startAdornment: (<InputAdornment position="start"> <LocalPhoneTwoTone color='secondary' /></InputAdornment>)
                      }}

                    />
                    <Typography variant="subtitle2" color="crimson">{<ErrorMessage name='phone' />}</Typography>
                    <FormControl fullWidth variant="standard" InputLabelProps={{ style: { fontSize: 20 } }} size="small">
                      <InputLabel>Department</InputLabel>
                      <Field as={Select}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="dept"
                        label="Department"
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        placeholder="select Department"

                      >
                        {
                          getdept?.map((data) =>(
                            <MenuItem value={data.deptType}>{data.deptType}</MenuItem>
                          ))
                        }
                      </Field>
                    </FormControl>
                    <Typography variant="subtitle2" color="crimson">{<ErrorMessage name='dept' />}</Typography>

                    <Field as={TextField}
                      name="password"
                      label="Password"
                      sx={styles.textfield}
                      variant='standard'
                      placeholder='Enter Your Password..'

                      type={type}
                      color="secondary"
                      InputLabelProps={{ style: { fontSize: 20 } }}
                      InputProps={{
                        startAdornment: (<InputAdornment position="start"> <PasswordTwoTone color='secondary' /></InputAdornment>)
                        ,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton aria-label="icon" color="secondary" onClick={showclick}>
                              {icon}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}

                    />
                    <Typography variant="subtitle2" color="crimson">{<ErrorMessage name='password' />}</Typography>
                    <Field as={TextField}
                      name="cpassword"
                      label="Confirm Password"
                      sx={styles.textfield}
                      variant='standard'
                      placeholder='Enter Your Comfirm Password'

                      type={type}
                      color="secondary"
                      InputLabelProps={{ style: { fontSize: 20 } }}
                      InputProps={{
                        startAdornment: (<InputAdornment position="start"> <PasswordTwoTone color='secondary' /></InputAdornment>)
                        ,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton aria-label="icon" color="secondary" onClick={showclick}>
                              {icon}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}

                    />
                    <Typography variant="subtitle2" color="crimson">{<ErrorMessage name='cpassword' />}</Typography>
                    <Button type="submit" sx={styles.btn} variant="contained" color="secondary" endIcon={<LoginRounded />} >
                      Sign Up
                    </Button>
                  </Form>
                )
              }
            </Formik>
          </Grid>
          <Grid row sx={styles.Box1} >
            <img src={signup} alt="" style={styles.img} />
          </Grid>
        </Grid>

      }
    </>
  )
}

export default Empregister