import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Paper, IconButton, Button } from '@mui/material'
import React, { useEffect } from 'react'
import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'
import Header from '../Global/Header'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './AdminLoader'
import { tokens } from '../../Global'
import { getAcceptCastCerReq } from '../../Action/Services/Cast'
import AdminAuth from '../ProtectedRoute/AdminAuth'


const GetAccCast = () => {
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)
    const { loading, getAccCastCerReq } = useSelector((state) => (state.services))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAcceptCastCerReq())
    }, [dispatch])

    const reload = () => { 
        dispatch(getAcceptCastCerReq())
     }
    

    return (
        <div className='app'>
            <AdminSidebar />
            <main className='content'>
                <AdminTopbar />

                <Box m="15px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title=" Accepted Caste Certificate Request" subtitle="Welcome to Accepted Cast Certificate Request Details Page" />
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
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Village</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Tehsil</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>District</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>State</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Father Name</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Mother Name</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Cast</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Proof</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ backgroundColor: colors.primary[600] }}>

                                        {getAccCastCerReq <= 0 ? <TableRow>
                                            <TableCell colSpan={12}>
                                                <Typography sx={{ margin: "10px auto", width: "10rem" }} variant="h1" color="primary">No  Accepted Cast  Certificate</Typography>
                                            </TableCell>
                                        </TableRow>
                                            :
                                            getAccCastCerReq?.map((data) => (
                                                <TableRow key={data._id}>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.name}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.email}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.phone}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.village}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.tehsil}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.district}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.state}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.fatherName}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.motherName}</TableCell>
                                                     <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.cast}</TableCell>
                                                    <TableCell >
                                                        <Button variant="contained" color="primary"   >
                                                            <a href={`http://localhost:5000/PDF/${data.proof}`} style={{ textDecoration: "none", color: "white" }} target="_blank" rel="noopener noreferrer">View</a>

                                                        </Button>
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

export default AdminAuth(GetAccCast)