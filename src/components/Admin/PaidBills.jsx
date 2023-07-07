import React, { useEffect } from 'react'
import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'
import { tokens } from '../../Global'
import Loader from './AdminLoader'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Global/Header'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Paper, IconButton, TextField , Button } from '@mui/material'
import {  GetPaidBill} from '../../Action/Admin/Bills'
import AdminAuth from '../ProtectedRoute/AdminAuth'
const PaidBills = () => {
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)

    const { getpaidbill , loading } = useSelector((state) => (state.services))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetPaidBill())
    }, [])

    const reload = () => { 
        dispatch(GetPaidBill())
     }
    
  return (
    <div className='app'>
    <AdminSidebar />
    <main className='content'>
        <AdminTopbar />
        <Box m="15px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Paid Bills" subtitle="Welcome To Paid Bills Details Page" />
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
                    <Typography variant="h3" color={colors.redAccent[600]}>Paid Bill Details</Typography>
                    <TableContainer sx={{ mt: "10px", minWidth: 200 ,height:"400px", overflow:"auto",  backgroundColor: colors.primary[600] }} component={Paper}>
                        <Table size='small' >
                            <TableHead  >
                                <TableRow >
                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Bill Type</TableCell>
                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Owner Name</TableCell>
                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Tenament No.</TableCell>
                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Street Address</TableCell>
                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Area</TableCell>
                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ backgroundColor: colors.primary[600]}}>

                                {
                                    getpaidbill <= 0 ? <TableRow>
                                        <TableCell colSpan={6}>
                                            <Typography sx={{ margin: "10px auto", width: "10rem" }} variant="h2" color="primary">No Complaint Data</Typography>
                                        </TableCell>
                                    </TableRow> : getpaidbill?.map((data) => (
                                        <TableRow key={data._id}>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.billType}</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.ownerName}</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.tenamentNo}</TableCell>
                                            
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.streetAddress}</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.area}</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.amount}</TableCell>

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

export default AdminAuth(PaidBills)