import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Cookies from 'js-cookie'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Login } from '../../Action/Employee/register';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

import { useState } from 'react';
const theme = createTheme();
const Emplogin = () => {

    const [data, setData] = useState();
    
    const initialevalues = {
        email: "",
        password: ""

    }


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validationcomplaint = Yup.object().shape({
        email: Yup.string().email("Please Enter Valid Email").required("Please Enter Email"),
        password: Yup.string().required("Please Enter Your Password")
    })
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({

        initialValues: initialevalues,
        validationSchema: validationcomplaint,

        onSubmit: async(values) => {
          const data =   await  dispatch(Login(values))
             data && navigate('/work')
            
        }
    })

    React.useEffect(() => {
      const myCookie =   Cookies.get('empToken')
      myCookie &&  navigate('/work') 
    }, []);
   
   

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <form onSubmit={handleSubmit}>

                                    <TextField
                                        margin="normal"
                                       
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                    {errors.email && touched.email ? (
                                        <Typography color="crimson">{errors.email}</Typography>
                                    ) : null}
                                    <TextField
                                        margin="normal"
                                        
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                    />
                                    {errors.password && touched.password ? (
                                        <Typography color="crimson">{errors.password}</Typography>
                                    ) : null}
                                   
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                </form>
                                <Grid container>
                                    <Grid item xs>
                                        <NavLink to='/eforgotpassword' variant="body2">
                                            Forgot password?
                                        </NavLink>
                                    </Grid>
                                    <Grid item>
                                        <NavLink to='/empregister' variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </NavLink>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}

export default Emplogin