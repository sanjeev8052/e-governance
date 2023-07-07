import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, makeStyles, TextField, Button, CircularProgress } from '@material-ui/core'
import { ResetSchema } from '../../ValidateSchema/User'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAlert } from 'react-alert'
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
    marginTop: "2rem",

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

const AdminResetPassword = () => {
    const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { token } = useParams()
  const alert = useAlert();

  const initialvalues = {
  }

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues: initialvalues,
    validationSchema: ResetSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const { data } = await axios.put(`/api/admin/adminreset/password/${token}`, values)
        data ? alert.success(data.message) : null
        data ? setLoading(false) : null
         navigate('/adlogin')
      } catch (error) {
        error ? setLoading(false) : null
        alert.error(error.response.data.message)

      }
    }
  })
  const style = useStyle();
  return (
    <Box className={style.conatiner}>
    <form onSubmit={handleSubmit} className={style.form}>
      <Typography variant="h1" color="initial">Set New Password</Typography>
      <TextField className={style.input}
        id=""
        fullWidth
        variant='outlined'
        size='small'
        label='Enter New Password'
        name='password'
        onChange={handleChange}
      />
      <Typography className={style.error} >{errors.password}</Typography>

      <TextField className={style.input}
        id=""
        fullWidth
        variant='outlined'
        size='small'
        label='Enter New Password'
        name='confirm_password'
        onChange={handleChange}
      />
      <Typography className={style.error} >{errors.confirm_password}</Typography>
      <Button fullWidth type='submit' disabled={loading} className="mt-3" variant="contained" color="primary">
       { loading ?  <CircularProgress /> : "Set Password"}
      </Button>
    </form>
  </Box>
  )
}

export default AdminResetPassword
