import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Paper, IconButton, Button } from '@mui/material'
import React, { useEffect } from 'react'
import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'
import Header from '../Global/Header'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './AdminLoader'
import { tokens } from '../../Global'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { CancelTwoTone, CheckCircleOutlineTwoTone, Height } from '@mui/icons-material'
import { getMeterApplyReq, rejMeterReq, accMeterReq } from '../../Action/Services/Meter'
import AdminAuth from '../ProtectedRoute/AdminAuth'

const GetmeterReq = () => {
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)
    const { loading, getMeterReq, accMeterReqMs, error, rejectMeterReqMs } = useSelector((state) => (state.services))
    const alert = useAlert();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getMeterApplyReq())
    }, [dispatch])

    useEffect(() => {
        if (accMeterReqMs) {
            alert.success(accMeterReqMs.message)
            dispatch({ type: "clearMessage" })
           
        }
        if (rejectMeterReqMs) {
            alert.success(rejectMeterReqMs.message)
            dispatch({ type: "clearMessage" })
           
        }
        
    }, [accMeterReqMs, rejectMeterReqMs, alert,dispatch])


    const confirm = (id) => {
        dispatch(accMeterReq(id));
    }
    const reject = (id) => {
        dispatch(rejMeterReq(id));
    }

    const reload = () => { 
        dispatch(getMeterApplyReq())
     }

    return (
        <div className='app'>
            <AdminSidebar />
            <main className='content'>
                <AdminTopbar />

                <Box m="15px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="Meter Request" subtitle="Welcome Your Meter Request Details Page" />
                        <Button variant="contained" color="success" onClick={reload}>
                            Reload
                        </Button>

                    </Box>
                    {loading ? <Loader /> :
                        <Box alignItems="center" justifyContent="center" m="15px" sx={{
                            "& .MuiTable-root": {
                                border: "none"
                            },
                            "& .MuiTableCell-root": {
                                borderBottom: "none"
                            },
                            "& .name-column--cell": {
                                color: colors.greenAccent[300]
                            },
                            "& .MuiTableHead-root": {
                                backgroundColor: colors.blueAccent[400],
                                borderBottom: "none"
                            }
                        }} >

                            <TableContainer sx={{ mt: "10px", height: "400px", overflow: "auto", backgroundColor: colors.primary[600] }} component={Paper} >
                                <Table size='small' sx={{ backgroundColor: colors.blueAccent[400] }}>
                                    <TableHead  >
                                        <TableRow >
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Name</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Email</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Phone NO.</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>MeterType</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Tenament NO.</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>City</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Area</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Proof</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ backgroundColor: colors.primary[600] }}>

                                        {getMeterReq <= 0 ? <TableRow>
                                            <TableCell colSpan={9}>
                                                <Typography sx={{ margin: "10px auto", width: "10rem" }} variant="h1" color="primary">No Meter Apply Request</Typography>
                                            </TableCell>
                                        </TableRow>
                                            :
                                            getMeterReq?.map((data) => (
                                                <TableRow key={data._id}>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.name}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.email}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.phone}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.meterType}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.tenamentNo}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.city}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.area}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>
                                                        <Button variant="contained" color="primary"   >
                                                            <a href={`http://localhost:5000/PDF/${data.proof}`} style={{ textDecoration: "none", color: "white" }} target="_blank" rel="noopener noreferrer">View</a>

                                                        </Button>
                                                    </TableCell>
                                                    <TableCell >
                                                        <IconButton aria-label="correct" color='success' onClick={() => { confirm(data._id) }}  >
                                                            <CheckCircleOutlineTwoTone />
                                                        </IconButton>
                                                        <IconButton aria-label="reject" color='error' onClick={() => { reject(data._id) }} >
                                                            <CancelTwoTone />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    }

                </Box>
            </main>
        </div>
    )
}

export default  AdminAuth(GetmeterReq)