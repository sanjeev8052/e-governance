
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Paper, IconButton, Button } from '@mui/material'
import { useAlert } from 'react-alert'
import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'
import Header from '../Global/Header'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './AdminLoader'
import { tokens } from '../../Global'
import { blockEmp, getEmp } from '../../Action/Admin/Employee'
import { Block } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import BlockEmployee from '../Global/BlockEmployee'
import AdminAuth from '../ProtectedRoute/AdminAuth'


const Employee = () => {
    const alert = useAlert();
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)
    const {  loading, emp, blockDataMs} = useSelector((state) => (state.admin))
    // console.log(emp)
    // console.log(blockData)
    const dispatch = useDispatch()
useEffect(() => {
    if (blockDataMs) {
        alert.success(blockDataMs.message)
        dispatch({ type: "clearMessage" })
      }
}, [blockDataMs])

    useEffect(() => {
        dispatch(getEmp())
    }, [ dispatch])

    const block = (id) => {
        dispatch(blockEmp(id));
    }


const reload = () => { 
    dispatch(getEmp())
 }

    return (
        <div className='app'>
            <AdminSidebar />
            <main className='content'>
                <AdminTopbar />

                <Box m="15px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="Employee" subtitle="Welcome Your Employee Details Page" />
                        <Box display="flex" >

                        <BlockEmployee />
                        <Button variant="contained" color="success" onClick={reload}  sx={{ml:"10px", borderRadius:"20px"}}>
                          Reload
                        </Button>
                        </Box>

                    </Box>
                    {
                        loading ? <Loader /> :
                            <Box m="40px 0 0 0" 
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
                                {/* <Typography variant="h3" color={colors.redAccent[600]}>Employees Details</Typography> */}
                                <TableContainer component={Paper} sx={{
                                    height:"400px", overflow:"auto",  backgroundColor: colors.primary[600]
                                }} >
                                    {
                                        <Table size='small'  >
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
                                            <TableBody  sx={{ backgroundColor: colors.primary[600]}}>


                                                {emp?.map((data) => (
                                                    <TableRow key={data._id}>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.name}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.email}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.gender}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.phone}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.dept}</TableCell>
                                                         <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>
                                                            <IconButton aria-label="block" color='error' onClick={() => { block(data._id) }}>
                                                                <Block />

                                                            </IconButton>

                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    }
                                </TableContainer>
                            </Box>
                    }
                    <Box />
                </Box>
            </main>
        </div>
    )
}

export default AdminAuth(Employee)