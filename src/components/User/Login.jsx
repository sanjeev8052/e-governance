

import React, { useEffect } from 'react'
import { TextField, InputAdornment, Typography, Button, FormControlLabel, Checkbox, IconButton, Grid } from '@mui/material'
import { Person, Login as LoginIcon, Lock, AppRegistration, Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../Action/User'
import { useAlert } from 'react-alert'
import { useFormik } from 'formik'
import loginuimage from '../../Images/login.jpg'
import bgImage from '../../Images/bgImage3.jpg'
import Footer from '../Layout/Footer/Footer'
import { signInSchema } from '../../ValidateSchema/User'


const Login = ({userCookie}) => { 
    const navigate = useNavigate();
    const {isAuthenticated } = useSelector(state=>state.user)

   useEffect(()=>{
    isAuthenticated && navigate('/')
   })
    const styles = {
        mainBox: {
            width: "100vw",
            height: "55vh",
            paddingTop: "6rem",
            background: "linear-gradient(to top right ,rgb(48, 94, 234),rgb(214, 245, 214))",
            backgroundSize: "cover"
        },
        BoxStyle: {
            display: "flex",
            width: '70%',
            margin: 'auto',
            boxShadow: "4px 4px 8px",
            borderRadius: '10px',
            backgroundColor: 'rgb(255, 255, 255 )',
            '@media (max-width: 500px  && min-width: 00px  )': {
                display: "none",
                width: '90%',
                borderRadius: '5px',
                margin: '8rem auto'
            },
            '@media ( min-width:820px && max-width: 1100px)': {
                width: '70%',
                borderRadius: '5px',
                margin: '17rem auto'
            },
        },
        inputStyle: {
            width: '100%',
            margin: "10px 0",
            padding: '5px 0',
            color: "white"
        },

        account: {
            display: "block",
            fontSize: "10rem",
            margin: 'auto'
        },

        link: {
            textDecoration: "none"
        },
        LoginBox: {
            marginTop: "2rem",
            width: "50%",
            padding: "3rem"
        },
        LoginImage: {
            width: "50%",
            borderRadius: '10px 0 0 10px',

        }

    }
    const dispatch = useDispatch();
    const alert = useAlert();


    const { loading } = useSelector((state) => state.user)
    const { message, LoginError } = useSelector((state) => state.user)

    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: "ClearLoginMessage" })
        }

        if (LoginError) {
            alert.error(LoginError.response.data.message)

            dispatch({ type: "ClearLoginMessage" })
        }
    }, [message, LoginError, alert, dispatch])


    const [type, setType] = useState('password')

    const [visible, setVisible] = useState(false)
    const icon = (visible ? <Visibility /> : <VisibilityOff />)
    const hide = () => {
        if (visible === false) {
            setVisible(true)
            setType('text')
        }
        else {
            setVisible(false)
            setType('password')
        }

    }

    const initialValues = {
        email: "",
        password: "",
    }

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signInSchema,
        onSubmit: (values) => {
            dispatch(userLogin(values))
        }
    })





    return (
        <Grid sx={styles.mainBox}>
            <Grid sx={styles.BoxStyle}>

                <img src={loginuimage} style={styles.LoginImage} alt="" />

                <form onSubmit={handleSubmit} style={styles.LoginBox}  >

                    {/* <AccountCircle color='primary' sx={styles.account} /> */}
                    <Typography variant="h2" mb={3}
                    >
                        Login Here
                    </Typography>
                    <TextField sx={styles.inputStyle}
                        label='Username'
                        variant='standard'
                        placeholder='Email or Mobile No.'
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        InputProps={{ startAdornment: (<InputAdornment position="start"> <Person /></InputAdornment>) }}
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    {errors.email && touched.email ? (
                        <Typography color="red">{errors.email}</Typography>
                    ) : null}
                    <TextField sx={styles.inputStyle}
                        label='Password' variant='standard'
                        placeholder='Password'
                        type={type}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">  <Lock /></InputAdornment>),
                            endAdornment: (<InputAdornment position="end"> <IconButton aria-label="" onClick={hide}>
                                {icon}
                            </IconButton>  </InputAdornment>)
                        }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete='off'
                    />
                    {errors.password && touched.password ? (
                        <Typography color="red">{errors.password}</Typography>
                    ) : null}
                  
                    {/* <ForgotPassword/> */}
                    <Button sx={{ marginLeft: 'auto', display: "block" }} component={Link}  to='/forgotpassword' variant='text' color="inherit"   >Forgot?</Button>

                    <Button type='submit' disabled={loading} sx={{ width: "100%" }} variant="contained" color="primary" endIcon={<LoginIcon />}>Login </Button>

                    <Typography sx={{ marginTop: "2rem" }} >
                        Not a member?
                        <Button component={Link} sx={styles.link} to='/register' variant="text" endIcon={<AppRegistration />}>
                            Register Now
                        </Button>
                    </Typography>

                </form>
            </Grid>
            <Footer />
        </Grid>
    )
}

export default Login
