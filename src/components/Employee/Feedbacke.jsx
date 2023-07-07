import { Paper, TableBody } from '@material-ui/core'
import { Box, useTheme, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableContainer } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Getfeedback } from '../../Action/User'
import { tokens } from '../../Global'

import EmployeeTopbar from '../Global/EmployeeTopbar'
import Header from '../Global/Header'
import AdminAuth from '../ProtectedRoute/AdminAuth'
const Feedbacke = () => {
    const { getfeedback } = useSelector((state) => (state.user))
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(Getfeedback())
    }, [])
  return (
    <>
    <EmployeeTopbar/>
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
                        <TableContainer component={Paper} sx={{
                            mt: "10px",
                            height: "400px", overflow: "auto", backgroundColor: colors.primary[600]
                        }}>
                            <Table size='small' >
                                <TableHead  >
                                    <TableRow >
                                        <TableCell sx={{ fontSize: "1.0rem", fontWeight: "bold", textTransform: 'capitalize' }}>Name</TableCell>
                                        <TableCell sx={{ fontSize: "1.0rem", fontWeight: "bold", textTransform: 'capitalize' }}>Feedback</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ backgroundColor: colors.primary[600] }}>
                                    {getfeedback <= 0 ? <TableRow>
                                        <TableCell colSpan={2}>
                                            <Typography sx={{ margin: "10px auto", width: "10rem" }} variant="h2" color="primary">No Feedback Added</Typography>
                                        </TableCell>
                                    </TableRow> :
                                        getfeedback?.map((data) => (
                                        <TableRow key={data._id}>
                                            <TableCell sx={{ fontSize: "1.0rem", fontWeight: "bold", textTransform: 'capitalize' }}>{data.name}</TableCell>
                                            <TableCell sx={{ fontSize: "1.0rem", fontWeight: "bold", textTransform: 'capitalize' }}>{data.feedback}</TableCell>
                                        </TableRow>))
                                    }



                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

    </>
  )
}

export default Feedbacke