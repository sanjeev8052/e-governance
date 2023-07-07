import React, { useEffect, useState } from 'react'
import { TextField, InputAdornment, Typography, Button, FormControlLabel, Checkbox, Grid } from '@mui/material'
import { Person, Login, Email, Password, Phone, CloudDone } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import signUpImage from '../../Images/bgImage4.jpg'
import Footer from '../Layout/Footer/Footer'
import { useFormik } from 'formik'
import { signUpSchema } from '../../ValidateSchema/User'
import { userRegisetr } from '../../Action/User'
import { useAlert } from 'react-alert'

const Register = () => {
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
        signUpBox: {
            marginTop: "2rem",
            width: "50%",
            padding: "3rem"
        },
        LoginImage: {
            width: "50%",
            borderRadius: '10px',

        }
    }

    const navigate = useNavigate()
    const ualert = useAlert()
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const { message , loading  , rerror } = useSelector(state => state.user)
    
    useEffect(() => {
        if (message) {
            ualert.success(message.Regmessage)
            navigate('/login')
            dispatch({
                type: "ClearRegisterMessage"
            })
        }
        if (rerror) {
            ualert.error(rerror.response.data.Regmessage)
            dispatch({
                type: "ClearRegisterMessage"
            })
        }
    }, [message, rerror ,]);

    const initialvalues = {
        name: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: ""
    }
    const { values, touched, errors, handleBlur, handleChange, handleSubmit, } = useFormik({
        initialValues: initialvalues,
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            checked ? dispatch(userRegisetr(values)) : alert(" Pleas Check Terms and Condition")
        }
    })

    return (
        <Grid sx={styles.mainBox}>
            <Grid sx={styles.BoxStyle}>


                <form onSubmit={handleSubmit} style={styles.signUpBox}>
                    <Typography variant="h2" mb={3}>Create Account</Typography>

                    <TextField sx={styles.inputStyle}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        InputProps={{ startAdornment: (<InputAdornment position="start">  <Person /> </InputAdornment>) }}
                        label='Enter Name' variant='standard'
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                        <Typography color="red">{errors.name}</Typography>
                    ) : null}

                    <TextField sx={styles.inputStyle}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        InputProps={{ startAdornment: (<InputAdornment position="start">  <Phone /> </InputAdornment>), }}
                        label='Enter Mobile No' variant='standard'
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {errors.phone && touched.phone ? (
                        <Typography color="red">{errors.phone}</Typography>
                    ) : null}

                    <TextField sx={styles.inputStyle}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        InputProps={{ startAdornment: (<InputAdornment position="start">  <Email /> </InputAdornment>) }}
                        label='Enter Email' variant='standard'
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {errors.email && touched.email ? (
                        <Typography color="red">{errors.email}</Typography>
                    ) : null}
                    <TextField sx={styles.inputStyle}
                        InputLabelProps={{ style: { fontSize: 20 } }} type='password'
                        InputProps={{ startAdornment: (<InputAdornment position="start">  <Password /> </InputAdornment>) }}
                        label='Enter Password' variant='standard'
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {errors.password && touched.password ? (
                        <Typography color="red">{errors.password}</Typography>
                    ) : null}
                    <TextField sx={styles.inputStyle}
                        InputLabelProps={{ style: { fontSize: 20 } }} type='password'
                        InputProps={{ startAdornment: (<InputAdornment position="start">  <Password /> </InputAdornment>) }}
                        label='Confirm Password' variant='standard'
                        name="confirm_password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {errors.confirm_password && touched.confirm_password ? (
                        <Typography color="red">{errors.confirm_password}</Typography>
                    ) : null}
                    <FormControlLabel
                        label="I agree to the terms and condition "
                        control={
                            <Checkbox
                                onChange={(e) => setChecked(e.target.checked)}
                                checked={checked}
                                name="term"
                                color="primary"

                            />
                        }
                    />


                    <Button sx={{ width: "100%" }} disabled={loading}  type='submit' variant="contained" color="primary">
                        Register
                    </Button>

                    <Typography sx={{ marginTop: "2rem" }} >Have an already account <Button component={Link} to='/login' variant="text" endIcon={<Login />}>
                        Login
                    </Button> </Typography>
                </form>
                <img src={signUpImage} style={styles.LoginImage} alt="" />
            </Grid>
            <Footer />
        </Grid>
    )
}

export default Register
