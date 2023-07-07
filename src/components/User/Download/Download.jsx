import React, { useState } from 'react'
import { Box, Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import './Download.css'
import axios from 'axios'
import { AssuredWorkloadOutlined, PictureAsPdf, Cancel } from '@mui/icons-material'
import Footer from '../../Layout/Footer/Footer'
import Pdf from '../../Global/Pdf'
import { useFormik } from 'formik'
import { downloadSchema } from '../../../ValidateSchema/Services'
import sujeet from '../../../Images/s.jpg'

const Download = () => {


  const [data, setData] = useState();
  const currentDate = new Date().toLocaleDateString();
  const [loading, setLoading] = useState(false);
  const initialValues = {
  }
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: downloadSchema,
    onSubmit: async (values) => {

      try {
        setLoading(true)
        const { data } = await axios.post('api/searchReciept', values)
        setData(data[0])
        setLoading(false)

      } catch (error) {
        alert(error.response.data.message)
        setLoading(false)
      }
    }
  })
  return (
    <Box className='download'>
      {!data && <form onSubmit={handleSubmit}>
        <div className="form">
          <h1>Download Certificate</h1>
          <Typography variant="h4" className='mt-5' color="initial">
            Enter Certificate No.
          </Typography>
          <TextField className='mb-5 mt-1' fullWidth
            id=""
            label=""
            variant='outlined'
            size='small'
            name='uniqueId'
            onChange={handleChange}
            type='number'
            placeholder=' Enter Certificate No.'
          />
          {errors.uniqueId && (
            <Typography className='text-danger'>{errors.uniqueId}</Typography>
          )}
          <Button type='submit' variant="contained" className='mb-5' color="primary">
            {loading ? <CircularProgress /> : "Search"}
          </Button>
        </div>
      </form>}
      {data &&
         <div className='text-center ' style={{display:"flex" , justifyContent:"center", alignItems:"center"}}>
         <Button className='m-3' onClick={() => setData(null)} variant="contained" color="secondary">
             <Cancel /> Cancel
         </Button>
         <Pdf contentId="mainbox" downloadFileName="CastCertificate"/>
     
         
        </div>}
      {data && <Box className='mainBox' id="mainbox">
        <Box className="row rowHeader">
          <Box className="col-sm-4">
            <AssuredWorkloadOutlined sx={{ color: "black", fontSize: "3rem" }} />
          </Box>
          <Box className="col-sm-8">
            <Typography variant='h3' color="initial">E-Governance</Typography>
          </Box>
        </Box>
        <div className=" text-center m-5">
          <h2>Government Of India</h2>
          <h2>Cast Certificate</h2>
        </div>
        <div className="row p-5">
          <div className="col-sm-4 ">
            <Typography variant="h6" className='mt-3' color="initial">Name</Typography>
            <Typography variant="h6" className='mt-3' color="initial">Father Name</Typography>
            <Typography variant="h6" className='mt-3' color="initial">Mother Name</Typography>
            <Typography variant="h6" className='mt-3' color="initial">Gender</Typography>
            <Typography variant="h6" className='mt-3' color="initial">Cast</Typography>
          </div>
          <div className="col-sm-4">
            <Typography variant="h6" className='mt-3' color="initial">{data.name}</Typography>
            <Typography variant="h6" className='mt-3' color="initial">{data.fatherName}</Typography>
            <Typography variant="h6" className='mt-3' color="initial">{data.motherName}</Typography>
            <Typography variant="h6" className='mt-3' color="initial">{data.gender}</Typography>
            <Typography variant="h6" className='mt-3' color="initial">{data.cast}</Typography>

          </div>
          <div className="col-sm-4">
          </div>
          <div className="col-lg-12 mt-5">
            <h5>This is to certify that <u>{data.name}</u> son of  <u>{data.fatherName}</u> Of village  <u>{data.village}</u> , teshil  <u>{data.tehsil}</u>,
              in the district of <u>{data.district}</u> in the State Of  <u>{data.state}</u>  belongs to  <u>{data.cast}</u> category. </h5><br /><br />
            <h5>
              <u>{data.name}</u> and/or her family ordinarly resides in village  <u>{data.village}</u> , teshil  <u>{data.tehsil}</u> ,
              in the district of <u>{data.district}</u>
            </h5>
          </div>
          <div className="col-sm-4">

          </div>
          <div className="col-sm-4">

          </div>
          <div className="col-sm-4 mt-5">
            <h5>Date </h5>
            <h5>Signature</h5>
          </div>
        </div>
        <Box className="rowFooter">

          <Box className="col-sm-12">
            <Typography variant='h6' color="initial">Printing  Date : {currentDate}</Typography>
          </Box>
        </Box>
      </Box>}
      <Footer />
    </Box>
  )
}

export default Download
