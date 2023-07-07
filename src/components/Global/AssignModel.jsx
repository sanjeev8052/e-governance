import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import { useAlert } from 'react-alert';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Button } from '@material-ui/core'
import { Box, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Typography, FormControl, InputLabel, Select, MenuItem, TextareaAutosize } from '@mui/material'
import { tokens } from '../../Global'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Getdept } from '../../Action/Admin/Categories';
import AdminAuth from '../ProtectedRoute/AdminAuth';
const useStyle = makeStyles({
  input: {
    width: "100%",
    margin: "0.5rem 0 "

  }
  , box: {
    width: "50%"
  }
})


const AssignModel = () => {

  const alert = useAlert();
  const dispatch = useDispatch()
  const { getdept, loading } = useSelector((state) => (state.services))

  const [emp, setEmp] = useState([]);
  const [dept, setDept] = useState({})
  const classes = useStyle()
  const themes = useTheme()
  const colors = tokens(themes.palette.mode)
  const { _id } = useParams();
  const [details, setDetails] = useState({})
  

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(Getdept())
    loaddetails()
  }, [])
  

  
  const loaddetails = async () => {
    const response = await axios.get(`/api/admin/compdata/${_id}`)
    setDetails(response.data)
  }
  const handleDetpt = async (e) => {
    const deptValue = e.target.value
    const { data } = await axios.get(`/api/admin/deptwise?d=${deptValue}`)
    setDept(deptValue)
    setEmp(data)
  }
  const initialvalue = {

  }

  const Back = () => {
    navigate('/assign')
  }
  const validationSchema = Yup.object().shape({
    // city: Yup.string().required("Please Fill This Field"),
    // streetAddress: Yup.string().required("Please Fill This Field"),
    // area: Yup.string().required("Please Fill This Field"),
    // complaintDesc: Yup.string().required("Please Fill This Field"),
    dept: Yup.string().required("Please Select Department"),
    emp: Yup.string().required("Please Select Employee"),
  })

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues: initialvalue,
    // validationSchema: validationSchema,

    onSubmit: (values) => {

      axios.post("/api/admin/assigncom", { empId: values.empId, compId: details._id })
      navigate('/assign')
      //dispatch(CompReq(user, values))
    }


  })

  console.log(values)
  return (
    <>

      <Box >
        <Dialog open="true" maxWidth="md"
          PaperProps={{ sx: { width: "80%", position: "fixed", m: 0, top: 20, backgroundImage: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)', } }} >
          <DialogTitle>
            <Typography variant="h3" color={colors.redAccent[400]}>Assign</Typography>
          </DialogTitle>
          <DialogContent>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '50%',
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "3px 3px 6px"

            }}>
              <form onSubmit={handleSubmit}>
              <Typography variant="h6" color="initial">City :-</Typography>
                <TextField
                  className={classes.input}
                  placeholder='City'
                  variant='outlined'
                  size='small'
                  name='city'
                  value={details.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 <Typography variant="h6" color="initial">Street Address :-</Typography>
                <TextField
                  className={classes.input}
                  id=""
                  placeholder='Street Address '
                  variant='outlined'
                  size='small'
                  onChange={handleChange}
                  name='streetAddress'
                  onBlur={handleBlur}
                  value={details.streetAddress}
                />
                 <Typography variant="h6" color="initial">Area Name :-</Typography>
                <TextField
                  className={classes.input}
                  id=""
                  placeholder='Area Name '
                  variant='outlined'
                  size='small'
                  name='area'
                  onChange={handleChange}
                  value={details.area}
                  onBlur={handleBlur}
                />
                <Typography variant="h6" color="initial">Compplaint Description </Typography>
                <TextareaAutosize
                  className={classes.input}
                  name="complaintDesc"
                   minRows={3}
                  maxRows={3}
                  value={details.complaintDesc}
                  onBlur={handleBlur}

                />

                <FormControl fullWidth variant="standard" sx={{ marginBottom: "2rem" }} InputLabelProps={{ style: { fontSize: 20 } }} size="small">
                  <InputLabel>Department</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="dept"
                    label="Department"
                    value={dept}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    placeholder="select Department"
                    onChange={handleDetpt}

                  >
                    {
                      getdept?.map((data) => (
                        <MenuItem value={data.deptType}>{data.deptType}</MenuItem>
                      ))
                    }
                    {/* <MenuItem value="road">Road</MenuItem>
                    <MenuItem value="Water">Water</MenuItem>
                    <MenuItem value="Drain">Drain</MenuItem> */}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="standard" sx={{ marginBottom: "2rem" }} InputLabelProps={{ style: { fontSize: 20 } }} size="small">
                  <InputLabel>Employee</InputLabel>
                  <Select
                    name='empId'
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    placeholder="select Department"
                    onChange={handleChange}
                  >
                    {
                      emp?.map((data) => (
                        <MenuItem value={data._id}>{data.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <Button variant='contained' color='primary' type='submit'sx={{ mt :"8px" }}>
                  Assign
                </Button>
              </form>
            </Box>
          </DialogContent>
          <DialogActions sx={{ ml: "10px"  }}>
            <Button color="error" variant="contained" sx={{ borderRadius: "100px", mr: '10px', mb: '5px' }} onClick={Back} >
              Back
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </>
  )
}

export default AdminAuth(AssignModel)