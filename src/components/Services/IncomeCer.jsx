import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Typography, useTheme } from '@material-ui/core'
import { Send } from '@mui/icons-material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer/Footer';
import { useFormik } from 'formik'
import { incomeValidation } from '../../ValidateSchema/Services';;
import { useAlert } from 'react-alert'
import axios from 'axios';

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
    backgroundColor: "gray",
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

const IncomeCer = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [file2, setFile2] = useState();
  const [image2, setImage2] = useState();
  const navigate = useNavigate()
  const alert = useAlert()
  const handleFile = (e) => {

    const file = e.target.files[0]
    setFile(file)

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
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues: initialvalues,
    validationSchema: incomeValidation,

    onSubmit: async (values) => {
      try {
        if (file2) {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("file2", file2)
          formData.append('data', JSON.stringify(values));
          // console.log(values)
          // console.log(file)
          const { data } = await axios.post('/api/incomereq', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          alert.success(data.message)
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
          <Typography variant="h4" sx={{ marginBottom: "20px" }} color="initial">Apply Income Certificate</Typography>
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
            <Typography className={classes.error}   >{errors.name}</Typography>
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
          ) : null}
          <Typography variant="h6" color="initial">Age</Typography>
          <TextField className={classes.fullInput}
            id=""
            placeholder='Enter Your Age '
            variant='outlined'
            size='small'
            type="number"
            name='age'
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}

          />
          {errors.age && touched.age ? (
            <Typography className={classes.error}   >{errors.age}</Typography>
          ) : null}

          <FormControl fullWidth>
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
          <Typography variant="h6" color="initial">Income</Typography>
          <TextField className={classes.fullInput}
            id=""
            placeholder='Enter Your Income'
            variant='outlined'
            size='small'
            name='income'
            onChange={handleChange}
            value={values.income}
            onBlur={handleBlur}
          />
          {errors.income && touched.income ? (
            <Typography className={classes.error} >{errors.income}</Typography>
          ) : null}
          <Typography variant="h6" color="initial">purpose</Typography>
          <TextField className={classes.fullInput}
            id=""
            placeholder='Enter Your Purpose for issue certificate'
            variant='outlined'
            size='small'
            name='purpose'
            onChange={handleChange}
            value={values.purpose}
            onBlur={handleBlur}
          />
          {errors.purpose && touched.purpose ? (
            <Typography className={classes.error} >{errors.purpose}</Typography>
          ) : null}

          <Typography variant="h6" color="initial">Uplaod Your Adhar Card</Typography>
          <div className="row">
            <div className="col-sm-6 mt-2 mb-2">
              <input type="file" className='input-upload' onChange={handleFile2} name="" id="" />
            </div>
            <div className="col-sm-6 mt-1 mb-2" >
              <img style={{ width: "10rem" }} src={image2} alt="" />
            </div>
          </div>

          {console.log(errors)}
          <Button type='submit' color='primary' className={classes.button} variant="contained" endIcon={<Send />}>
            Apply
          </Button>
        </div>

      </form>

      <Footer />
    </div>
  )
}

export default IncomeCer