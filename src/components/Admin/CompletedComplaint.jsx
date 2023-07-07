import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Paper, IconButton, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'

import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'
import axios from 'axios'
import Header from '../Global/Header'
import { useDispatch, useSelector } from 'react-redux'
import { tokens } from '../../Global'
import { useState } from 'react'


const CompletedComplaint = () => {
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)
    const [data, setData] = useState();
    useEffect(() => {
        getCompleteComplaint();
    },[])

    const getCompleteComplaint = async () => {
        const { data } = await axios.get("api/admin/compComplete")
        setData(data.complaint)
    }

    const reload = () => { 
        getCompleteComplaint();
     }
    return (
        <div className='app'>
            <AdminSidebar />
            <main className='content'>
                <AdminTopbar />
                <Box m="15px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="Completed Complaints" subtitle="Welcome Your Completed Complaints Details Page" />
                        <Button variant="contained" color="success" onClick={reload}>
                            Reload
                        </Button>

                    </Box>
                    
                    {
                        // loading ? <Loader /> :
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
                                        <TableRow>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Name</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Complaint Type</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>StreetAddress</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Area</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Pincode</TableCell>
                                             <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Complaint Description</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ backgroundColor: colors.primary[600]}}>

                                        {
                                              data &&  data <= 0 ? <TableRow>
                                                    <TableCell colSpan={6}>
                                                        <Typography sx={{ margin: "10px auto", width: "10rem" }} variant="h2" color="primary">No Complaint Data</Typography>
                                                    </TableCell>
                                                </TableRow> : data?.map((data) => (
                                                    <TableRow key={data._id}>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.name}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.complaintType}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.streetAddress}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.area}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.pincode}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.complaintDesc}</TableCell>

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

export default CompletedComplaint