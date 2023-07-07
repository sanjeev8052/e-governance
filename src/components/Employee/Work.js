import React, { useState } from 'react'
import { useEffect } from 'react'
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, useTheme } from '@mui/material'

import { tokens } from '../../Global'
import EmployeeTopbar from '../Global/EmployeeTopbar'
import { useDispatch, useSelector } from 'react-redux'
import { getEmpDetails } from '../../Action/Employee/register'
import { DoneAll, Done , Remove , Delete} from '@mui/icons-material'
import EmpAuth from '../ProtectedRoute/EmpAuth'
import axios from 'axios'

const Work = () => {

  const themes = useTheme()
  const [btnloading, setLoading] = useState(false);
  const colors = tokens(themes.palette.mode)
  const dispatch = useDispatch()
  const [empCompDet, setEmpCompDet] = useState([]);
  useEffect(() => {
    dispatch(getEmpDetails())
  }, [])
  const { getEmpData, loading } = useSelector(state => state.employee)
  useEffect(() => {
    { getEmpData && setEmpCompDet(getEmpData.complaints) }
  }, [getEmpData])

  const handleConfirmation = async (id) => {
    try {
      setLoading(false)
      const { data } = await axios.post(`/api/employee/compComplete/${id}`)
      dispatch(getEmpDetails())
      setLoading(false)
      alert(data.message)

    } catch (error) {
      setLoading(false)
      alert(error.response.data)
    }
  }


  return (
    <>
      <EmployeeTopbar />

      <div>
        <Box mt="10px" mb='20px'>
          <TableContainer  >
            <Table size="medium"  >
              <TableHead>
                <TableRow sx={{ backgroundColor: colors.greenAccent[200] }}>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone NO.</TableCell>
                  <TableCell>Complaint Type</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>StreetAddress</TableCell>
                  <TableCell>Area</TableCell>
                  <TableCell>Pincode</TableCell>
                  <TableCell>Complaint Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: colors.grey[200] }}>

                {empCompDet <= 0 ? <TableRow>
                  <TableCell colSpan={10}>
                    <Typography sx={{ margin: "10px auto", width: "10rem" }} variant="h2" color="primary">No Complaint Type Added</Typography>
                  </TableCell>
                </TableRow>
                  :
                  empCompDet?.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell >{data.name}</TableCell>
                      <TableCell >{data.email}</TableCell>
                      <TableCell >{data.phone}</TableCell>
                      <TableCell >{data.complaintType}</TableCell>
                      <TableCell >{data.city}</TableCell>
                      <TableCell >{data.streetAddress}</TableCell>
                      <TableCell >{data.area}</TableCell>
                      <TableCell >{data.pincode}</TableCell>
                      <TableCell component='th' scope='row'>{data.complaintDesc}</TableCell>
                      <TableCell >
                        <IconButton aria-label="block" color='success'  >
                          {data.status === "asign" ? <Done disabled={btnloading} onClick={() => handleConfirmation(data._id)} /> : <DoneAll />}
                        </IconButton>
                        {/* <IconButton aria-label="block" color='error' >
                        {data.status === "asign" ? undefined : <Delete />}
                        </IconButton> */}
                        {/* <Button variant="contained" color="primary" size='small' sx={{ borderRadius: "100px" }} onClick={() => { block(data._id) }}><BlockTwoTone /> Block
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

      </div>
    </>
  )
}

export default EmpAuth(Work)