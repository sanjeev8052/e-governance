import { BlockTwoTone } from '@mui/icons-material'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Paper,Button,  IconButton } from '@mui/material'
import { useAlert } from 'react-alert'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BLockUser, getUser } from '../../Action/Admin/User'
import { tokens } from '../../Global'
import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'
import BlockUser from '../Global/BlockUser'
import Header from '../Global/Header'
import AdminAuth from '../ProtectedRoute/AdminAuth'
import Loader from './AdminLoader'

const User = () => {
    const themes = useTheme()
    const alert = useAlert();
    const colors = tokens(themes.palette.mode)
    const {  loading, GetUser,BlkUser} = useSelector((state) => (state.admin))
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
   
    useEffect(() => {
        if (BlkUser) {
            alert.success(BlkUser.message)
            dispatch({ type: "clearMessage" })
           
        }
    }, [BlkUser])
    
    const Block = (id) => { 
        dispatch(BLockUser(id))
       
     }

     const reload = () => { 
        dispatch(getUser())
     }
   
    return (
        <div className='app'>
            <AdminSidebar />
            <main className='content'>
                <AdminTopbar />
                <Box m="15px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="Users" subtitle="Welcome Your Users Details Page" />
                      <Box display="flex">
                        <BlockUser/>
                        <Button variant="contained" color="success" onClick={reload}  sx={{ml:"10px", borderRadius:"20px"}}>
                          Reload
                        </Button>
                      </Box>
                      
                    </Box>
                    {
                            loading ? <Loader/> : 
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
                                <Typography variant="h3" color={colors.redAccent[600]}>User Details</Typography>
                                <TableContainer  component={Paper} sx={{mt: "10px",
                                    height:"400px", overflow:"auto",  backgroundColor: colors.primary[600]
                                }}>
                                    <Table size='small' >
                                        <TableHead  >
                                            <TableRow >
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Name</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Mobile No.</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Email</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ backgroundColor: colors.primary[600]}}>
                                           
                                            {
                                        GetUser?.map((data) => (
                                            <TableRow key={data._id}>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.name}</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.phone}</TableCell>
                                                 <TableCell  sx={{  fontSize: "1.0rem", fontWeight:"bold" ,textTransform: 'capitalize' }}>{data.email}</TableCell>
                                         
                                                <TableCell >
                                                    <IconButton aria-label="block" color='error' onClick={() => { Block(data._id) }}>
                                                        <BlockTwoTone/>
                                                      
                                                    </IconButton>
                                                    {/* <Button variant="contained" color="primary" size='small' sx={{borderRadius:"100px"}} onClick={() => { block(data._id) }}><BlockTwoTone/> Block
                                                    </Button> */}
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

export default  AdminAuth(User)