
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Paper, IconButton, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'

import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'

import { useAlert } from 'react-alert'
import Header from '../Global/Header'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './AdminLoader'
import { tokens } from '../../Global'
import { DangerousTwoTone, TaskTwoTone } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { accCompReq, getCompReq, rejCompReq } from '../../Action/Services/Services'
import AdminAuth from '../ProtectedRoute/AdminAuth'


const AdminComplaint = () => {
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)
    const { loading, getComReq,accComReqMs,rejComReqMs} = useSelector((state) => (state.services))
   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert();
    useEffect(() => {
        dispatch(getCompReq())
    }, [ dispatch, navigate])

    useEffect(() => {
        if (accComReqMs) {
            alert.success(accComReqMs.message)
            dispatch({ type: "clearMessage" })
        }
        if (rejComReqMs) {
            alert.success(rejComReqMs.message) 
            dispatch({ type: "clearMessage" })
        }
       
    }, [accComReqMs, rejComReqMs, alert])

    const accept = (id) => {
        dispatch(accCompReq(id))
       
    }
    const reject = (id) => {
        dispatch(rejCompReq(id))
    }
    const reload = () => { 
        dispatch(getCompReq())
     }
    return (
        <div className='app'>
            <AdminSidebar />
            <main className='content'>
                <AdminTopbar />
                <Box m="15px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="Complaints" subtitle="Welcome Your Complaints Details Page" />
                        {/* <EmpModel /> */}
                        <Button variant="contained" color="success" onClick={reload}>
                            Reload
                        </Button>
                    </Box>
                  
                   
                    {
                        loading ? <Loader /> :
                            <Box alignItems="center" justifyContent="center" m="15px"
                            sx={{
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
                            }}
                            >
                                <Typography variant="h3" color={colors.redAccent[600]}>Complaint Details</Typography>
                                <TableContainer sx={{ mt: "10px", minWidth: 200 , height:"400px", overflow:"auto",  backgroundColor: colors.primary[600]}} component={Paper}>
                                    <Table size='small' >
                                        <TableHead  >
                                            <TableRow >
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Name</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Email</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Phone NO.</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Complaint Type</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>City</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>StreetAddress</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Area</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Pincode</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Complaint Description</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ backgroundColor: colors.primary[600]}}>

                                            {getComReq <= 0 ? <TableRow>
                                                <TableCell colSpan={6}>
                                                    <Typography sx={{ margin: "10px auto", width: "10rem" }} variant="h2" color="primary">No Complaint Data</Typography>
                                                </TableCell>
                                            </TableRow> : getComReq?.map((data) => (
                                                <TableRow key={data._id}>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.name}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.email}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.phone}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.complaintType}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.city}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.streetAddress}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.area}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.pincode}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.complaintDesc}</TableCell>
                                                    <TableCell >
                                                        <IconButton aria-label="block" color='success' onClick={() => { accept(data._id) }}>
                                                            <TaskTwoTone  color='success'/>
                                                        </IconButton>
                                                        <IconButton aria-label="block" color='error' onClick={() => { reject(data._id) }}>
                                                            <DangerousTwoTone color='error' />
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

export default  AdminAuth(AdminComplaint)