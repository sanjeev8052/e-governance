import * as React from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles, Button, Typography , CircularProgress} from '@material-ui/core';
import { Send } from '@mui/icons-material';
import { useFormik } from 'formik';
import { forgotSchema } from '../../ValidateSchema/User';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPass } from '../../Action/User';
import { useAlert } from 'react-alert';
import axios from 'axios'
import { useState } from 'react';
const useStyle = makeStyles({
    conatiner: {
        width: "100vw",
        height: "50vh",
        paddingTop: "15rem",
        background: "linear-gradient(to top right ,rgb(48, 94, 234),rgb(214, 245, 214))",

    },
    form: {
        width: "30%",
        backgroundColor: "white",
        padding: "2rem",
        boxShadow: "3px 3px 6px",
        borderRadius: "10px",
        margin: "auto",
    },
    input: {
        width: "100%",
    },
    button: {
        width: "50%",
        display: "block",
        margin: "3rem   auto 0"
    },
    error: {
        color: "red"
    }

})
const EmpforgetPasswrod = () => {
    const alert = useAlert()
    const [message, setMessage] = React.useState()
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const initialvalues = {
        email: ""
    }
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({

        initialValues: initialvalues,
        validationSchema: forgotSchema,

        onSubmit: async(values) => {
            try {
                setLoading(true)
                const { data } = await axios.post("api/employee/forgot/password", values)
                setLoading(false)
                setMessage(data.message)
            } catch (error) {
                setLoading(false)
                alert.success(error.response.data.message)
            }
        }

    })


    const style = useStyle();

    return (
        <div className={style.conatiner}>
            <form onSubmit={handleSubmit} className={style.form} >
                <Typography variant='h5' > Forgot Password</Typography>
                <hr />
                <TextField className={style.input}
                    id=""
                    label=""
                    placeholder='Enter Your Email...'
                    onChange={handleChange}
                    name="email"
                    onBlur={handleBlur}
                />
                <Typography className={style.error} >{errors.email}</Typography>
                <Button type='submit' disabled={loading} variant="contained" className={style.button} color="primary">
                   {loading ?   <CircularProgress/> : "Send" }
                </Button>
            </form>
            <Typography className='text-success text-center m-2' variant="h5" >{message}</Typography>
        </div>
    )
}

export default EmpforgetPasswrod
