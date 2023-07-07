import React, { useEffect } from 'react'
import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'
import { tokens } from '../../Global'
import Loader from './AdminLoader'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Global/Header'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Paper, IconButton, TextField,Button } from '@mui/material'
import { GetPendingBill } from '../../Action/Admin/Bills'
import AdminAuth from '../ProtectedRoute/AdminAuth'

const PendingBills = () => {
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)

    const { getpenbill , loading } = useSelector((state) => (state.services))
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(Getbillcat())
        dispatch(GetPendingBill())
    }, [])
    // console.log(getpenbill)

    const reload = () => { 
        dispatch(GetPendingBill())
     }
    return (
        <div className='app'>
            <AdminSidebar />
            <main className='content'>
                <AdminTopbar />
                <Box m="15px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="Pending Bills" subtitle="Welcome To Pending Bills Details Page" />
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
                            <Typography variant="h3" color={colors.redAccent[600]}>Pending Bill Details</Typography>
                            <TableContainer sx={{ mt: "10px", minWidth: 200 ,  height:"400px", overflow:"auto",  backgroundColor: colors.primary[600]}} component={Paper}>
                                <Table size='small' >
                                    <TableHead  >
                                        <TableRow>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Bill Type</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Owner Name</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Tenament No.</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Street Address</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Area</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Past Due Amount </TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Amount</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Totel</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Bill Date</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Last Due Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ backgroundColor: colors.primary[600]}}>

                                        { getpenbill &&
                                            getpenbill <= 0 ? <TableRow>
                                                <TableCell rowSpan={3} colSpan={10}>
                                                    <Typography className='text-center' sx={{ margin: "10px auto", display:"block" }} variant="h2" color="primary">No Bill Pending Data</Typography>
                                                </TableCell>
                                            </TableRow> : getpenbill?.map((data) => (
                                                <TableRow key={data._id}>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.billType}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.ownerName}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.tenamentNo}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.streetAddress}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.area}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.pastDueAmt}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.amount}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.totelAmt}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.addDate}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.lastDueDate}</TableCell>
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

export default AdminAuth(PendingBills)