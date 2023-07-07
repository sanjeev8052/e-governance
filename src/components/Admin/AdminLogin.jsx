import React, { useState, useEffect } from 'react'

import { Grid, TextField, InputAdornment, Button, Typography, IconButton, } from '@mui/material'
import { Email, LoginRounded, PasswordOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import Logo from '../Images/Icons/password.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { adminLogin } from '../../Action/Admin/Login';
// import { useAlert } from 'react-alert';
import axios from 'axios';


const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { isAuthenticated, loading } = useSelector(state => state.admin)
    isAuthenticated && navigate('/dashboard')


    const detail = {
        email: "",
        password: "",
    }

    const [type, setType] = useState("password")
    const [visible, setVisible] = useState(false)
    const icon = (visible ? <Visibility /> : <VisibilityOff />)
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

            color: "black",
            width: "35%",
            margin: " 9rem auto",
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
            display: " block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2px",
            height: "120px",
            width: "120px"
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
        }

    }
    const alert = useAlert();

    const onSubmit = (values) => {
       dispatch(adminLogin(values))
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please Enter Valid Email").required("Please Enter Email"),
        password: Yup.string().required("Please Enter Your Password")
    })

    return (

        <>
            <div className='app' style={{
                backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
                backgroundRepeat: "no-repeat"
            }}>
                <main className='content'>
                    <Grid sx={styles.Box}>

                        <img src={Logo} style={styles.icon} alt="" />
                        <Formik initialValues={detail} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {
                                (props) => (

                                    <Form>

                                        <Field as={TextField}
                                            sx={styles.textfield}
                                            label='Email'
                                            variant='standard'
                                            placeholder='Enter Email..'
                                            type="email"
                                            color="secondary"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> <Email color='secondary' /></InputAdornment>)
                                            }}
                                            name="email"

                                        />

                                        <Typography variant="subtitle1" color="crimson">{<ErrorMessage name='email' />}</Typography>
                                        <Field as={TextField}
                                            sx={styles.textfield}
                                            label='Password'
                                            variant='standard'
                                            placeholder='Enter Password'
                                            type={type}
                                            color="secondary"
                                            InputLabelProps={{ style: { fontSize: 20 } }}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"> < PasswordOutlined color='secondary' /></InputAdornment>)
                                                ,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton aria-label="icon" color="secondary" onClick={showclick}>
                                                            {icon}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            name="password"


                                        />
                                        <Typography variant="subtitle1" color="crimson">{<ErrorMessage name='password' />}</Typography>
                                        <Typography variant="subtitle2" sx={styles.link} component={Link} color="initial" to="/AforgotPassword" >Forgot Password?</Typography>
                                        <Button disabled={loading} type="submit" variant="contained" color="secondary" endIcon={<LoginRounded />} sx={styles.btn} >
                                            Login
                                        </Button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </Grid>
                </main>
            </div>
        </>

    )
}

export default AdminLogin
