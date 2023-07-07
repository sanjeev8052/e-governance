import React, { useState } from 'react'
import { Box, Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import './Download.css'
import axios from 'axios'
import { AssuredWorkloadOutlined, PictureAsPdf, Cancel, CurrencyRupee } from '@mui/icons-material'
import Footer from '../../Layout/Footer/Footer'
import { useFormik } from 'formik'
import { downloadSchema, downloadSchema2 } from '../../../ValidateSchema/Services'
import sujeet from '../../../Images/s.jpg'
import Pdf from '../../Global/Pdf'
import logo from '../../../Images/logo.jpg'
const IncomeReciept = () => {


    const [data, setData] = useState();
    const currentDate = new Date().toLocaleDateString();
    const [loading, setLoading] = useState(false);
    const initialValues = {
    }
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: downloadSchema2,
        onSubmit: async (values) => {

            try {
                setLoading(true)
                const { data } = await axios.post('api/searchIncomCer', values)
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
                        Enter Form No.
                    </Typography>
                    <TextField className='mb-5 mt-1' fullWidth
                        id=""
                        label=""
                        variant='outlined'
                        size='small'
                        name='uniqueId'
                        onChange={handleChange}
                        type='number'
                        placeholder=' Enter Form No.'
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
                    <Pdf contentId="mainbox" downloadFileName="IncomeCertificate"/>
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
                <div className=" text-center " style={{ margin: " 0 2.5rem" }}>
                    <img src={logo} alt="" />
                    <h2>Government Of India</h2>
                    <h2>Income Certificate</h2>
                    <h5 className='mt-2  text-start'>
                        Certified that the annual family income  of the person with the details mentioned below from all source is. <CurrencyRupee/> {data.income}
                    </h5>
                    <div className='row'>
                        <h5 className='text-start col-6 mt-4 mb-2'>Form No:{data.uniqueId}</h5>
                        <h5 className='text-end col-6 mt-4 mb-2'>Date:{data.date}</h5>
                    </div>

                </div>
                <div className="col-sm-6">

                </div>
                <div className="col-sm-6">

                </div>
                <div className="row " style={{ padding: " 0 3rem" }}>
                    <div className="col-sm-5 icmtab">
                        <Typography variant="h6" className='mt-2' color="initial">Name</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">Gender</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">Age </Typography>
                        <Typography variant="h6" className='mt-2' color="initial">Name Of Father</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">Village</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">Teshil</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">District</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">State</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">Certificate Issued Date</Typography>
                        <Typography variant="h6" className='mt-2 mb-0' color="initial">Purpose for Certificate is Issued </Typography>




                    </div>
                    <div className="col-sm-7 icmtab">
                        <Typography variant="h6" className='mt-2' color="initial">{data.name}</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">{data.gender}</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">20</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">{data.fatherName}</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">{data.village}</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">{data.tehsil}</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">{data.district}</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">{data.state}</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">{data.date}</Typography>
                        <Typography variant="h6" className='mt-2' color="initial">{data.purpose}</Typography>
                  
                    </div>

                    <div className="col-lg-12 mt-5">
                        <h5>This certificate  is issued based on dedtails given in the application, local enquiry, facts and records produced.</h5>
                    </div>
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4 mt-5">
                       
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

export default IncomeReciept
