import React from 'react'
import './ContactUs.css'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Email, EmailOutlined, FacebookOutlined, Instagram, PhoneAndroidOutlined, Twitter, Send } from '@mui/icons-material'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Footer from '../../Layout/Footer/Footer'
import { useFormik } from 'formik'
import { ContactSchema } from '../../../ValidateSchema/User'
import axios from 'axios'
import { useAlert } from 'react-alert'




const ContactUs = () => {

    const initialValues = {}
    const alert = useAlert()

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ContactSchema,
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post(`/api/contactUs`, values)
                alert.success(data.message)
            } catch (error) {
                alert.error("sumthing went Wrong...")

            }
        }

    })


    return (
        <div className='box'>
            <div className="row">
                <div className=" Box2">
                    <div className="cInfo">
                        <Typography variant="h1" color="">Contact Info</Typography>
                        <div className='d-flex mt-5'>
                            <EmailOutlined /><Typography className='mx-3' variant="h3" color="initial"> abc123@gmail.com</Typography>
                        </div>
                        <div className='d-flex mt-3'>
                            <PhoneAndroidOutlined /><Typography className='mx-3' variant="h3" color="initial"> 843-543-5433</Typography>
                        </div>
                        <div className='d-flex mt-5 justify-content-center bg-white p-2 align-items-end text-decoration-none'>
                            <Link className='mx-3  '><FacebookOutlined /></Link>
                            <Link className='mx-3'><Instagram /></Link>
                            <Link className='mx-3'><Twitter /></Link>
                        </div>
                    </div>
                    <form className='cForm' onSubmit={handleSubmit}>
                        <Typography variant="h2" color=""> Send a message</Typography>
                        <TextField sx={{ margin: "0.5rem 0" }}
                            fullWidth
                            label="First Name "
                            name='fName'
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                        {errors.fName && touched.fName ? (
                            <Typography color="red">{errors.fName}</Typography>
                        ) : null}

                        <TextField sx={{ margin: "0.5rem 0" }}
                            fullWidth
                            label="Last Name "
                            name='lName'
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.lName && touched.lName ? (
                            <Typography color="red">{errors.lName}</Typography>
                        ) : null}

                        <TextField sx={{ margin: "0.5rem 0" }}
                            fullWidth
                            label="Email  "
                            name='email'
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                            <Typography color="red">{errors.email}</Typography>
                        ) : null}

                        <TextField sx={{ margin: "0.5rem 0" }}
                            fullWidth
                            label="Phone  "
                            name='phone'
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.phone && touched.phone ? (
                            <Typography color="red">{errors.phone}</Typography>
                        ) : null}

                        <Typography variant="h4" color="initial">Write Your Message Here</Typography>
                        <textarea
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="message"
                            cols="30"
                            rows="3">
                         

                        </textarea>

                        {errors.message && touched.message ? (
                            <Typography color="red">{errors.message}</Typography>
                        ) : null}
                        <Button type='submit' fullWidth variant="contained" color="primary">
                            Send <Send className='mx-2' />
                        </Button>

                    </form>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default ContactUs
