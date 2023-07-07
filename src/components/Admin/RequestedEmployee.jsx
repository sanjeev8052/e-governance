import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Paper, IconButton , Button} from '@mui/material'
import React, { useEffect } from 'react'
import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'

import { useAlert } from 'react-alert'
import Header from '../Global/Header'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './AdminLoader'
import { tokens } from '../../Global'
import { getTempEmp, conTempEmp, rejTempEmp } from '../../Action/Admin/Employee'
import { useNavigate } from 'react-router-dom'
import { CancelTwoTone, CheckCircleOutlineTwoTone, Height, PictureAsPdfRounded } from '@mui/icons-material'
import AdminAuth from '../ProtectedRoute/AdminAuth'

const RequestedEmployee = () => {
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)
    const { loading, empReq, cempMs, remp} = useSelector((state) => (state.admin))
    const alert = useAlert();

    const dispatch = useDispatch()
    useEffect(() => {
        if (cempMs) { 
            alert.success(cempMs.message)
            dispatch({ type: "clearMessage" })
           
        }
    }, [cempMs,dispatch,alert])

    useEffect(() => {
        if (remp) {
            alert.success(remp.message)
            dispatch({ type: "clearMessage" })
           
        }
    }, [remp,dispatch,alert])
    
    useEffect(() => {
       
        dispatch(getTempEmp())
    }, [dispatch ])

    const reject = (id) => {
        dispatch(rejTempEmp(id))
    }
    const confirm = (id) => {
        dispatch(conTempEmp(id));

    }
    const reload = () => { 
        dispatch(getTempEmp())
     }
    return (
        <div className='app'>
            <AdminSidebar />
            <main className='content'>
                <AdminTopbar />

                <Box m="15px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="Requested Employees" subtitle="Welcome Your Requested Employees Details Page" />
                        <Button variant="contained" color="success" onClick={reload}>
                            Reload
                        </Button>

                    </Box>
                    {loading ? <Loader /> :
                        <Box alignItems="center"  id="bid" justifyContent="center" m="15px" sx={{
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
                            <Typography variant="h3" color={colors.redAccent[600]}>Requested Employees Details</Typography>
                            <TableContainer sx={{ mt: "10px", height: "400px", overflow: "auto", backgroundColor: colors.primary[600] }} component={Paper} >
                                <Table size='small' sx={{ backgroundColor: colors.blueAccent[400] }}>
                                    <TableHead  >
                                        <TableRow >
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Name</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Email</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Gender</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Phone NO.</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Department</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ backgroundColor: colors.primary[600] }}>

                                        {empReq <= 0 ? <TableRow>
                                            <TableCell colSpan={6}>
                                                <Typography sx={{ margin: "10px auto", width: "10rem" }} variant="h2" color="primary">No Requested Employee Data</Typography>
                                            </TableCell>
                                        </TableRow>
                                            :
                                            empReq?.map((data) => (
                                                <TableRow key={data._id}>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.name}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.email}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.gender}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.phone}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.dept}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>
                                                        <IconButton aria-label="correct" color='success' onClick={() => { confirm(data._id) }}>
                                                            <CheckCircleOutlineTwoTone />
                                                        </IconButton>
                                                        <IconButton aria-label="reject" color='error' onClick={() => { reject(data._id) }}>
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

export default   AdminAuth(RequestedEmployee)