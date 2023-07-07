import { Button, makeStyles } from '@material-ui/core'
import { Box, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
// import "./../../index1.css"
import './Dashboard.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from '../Global/AdminSidebar'
import AdminTopbar from '../Global/AdminTopbar'
import Header from '../Global/Header'
import Loader from '../Layout/Loader'
import AdminAuth from '../ProtectedRoute/AdminAuth'
import { Person } from '@mui/icons-material'
import { PieChart } from 'react-minimal-pie-chart';
import { getUser } from '../../Action/Admin/User'
import { getEmp, getEmpDetails, getTempEmp } from '../../Action/Admin/Employee'
import { getCompReq } from '../../Action/Services/Services'
import axios from 'axios'
import { getAcceptMeterReq, getMeterApplyReq } from '../../Action/Services/Meter'



const Dashboard = () => {

  const { loading, GetUser, emp, empReq } = useSelector((state) => (state.admin))
  const { getComReq, getMeterReq, getAccMeterReq } = useSelector((state) => (state.services))
  const [empCompDet, setEmpCompDet] = useState([]);

  const { getEmpData } = useSelector(state => state.employee)
  const [compCompldata, setCompCompldata] = useState();
  useEffect(() => {
    getCompleteComplaint();
  }, [])

  const getCompleteComplaint = async () => {
    const { data } = await axios.get("api/admin/compComplete")
    setCompCompldata(data.complaint)
  }

  useEffect(() => {
    getAssignComp();
  }, [])

  console.log(empReq)
  const getAssignComp = async () => {
    try {
      const { data } = await axios.get('api/admin/getAssignComp')
      setEmpCompDet(data)
    } catch (error) {

    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser())
    dispatch(getEmp())
    dispatch(getCompReq())
    dispatch(getMeterApplyReq())
    dispatch(getAcceptMeterReq())
    dispatch(getTempEmp())
  }, []);

  const label = "Complaints"

  return (
    <Fragment>{loading ? <Loader /> :
      <div className='app'>
        <AdminSidebar />
        <main className='content'>
          <AdminTopbar />
          <Box m="15px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Header title="DASHBOARD" subtitle="Welcome to Yuor Dashboard" />
            </Box>
            <div className="row dashboard ">
              <Link to='/auser' className="col-2 dsItem1">
                <Person sx={{ fontSize: "4rem" }} />
                <Typography components={Link} to='/auser' variant="h2" color="white">User</Typography>
                <Typography variant="h1" color="white">{GetUser && GetUser.length}</Typography>

              </Link>
              <Link to='/aemployee' className="col-2 dsItem1">
                <Person sx={{ fontSize: "4rem" }} />
                <Typography variant="h2" color="lightblue">Employee</Typography>
                <Typography variant="h1" color="lightblue">{emp && emp.length}</Typography>

              </Link>
              <Link to='/aremployee' className="col-2 dsItem1">
                <Person sx={{ fontSize: "4rem" }} />
                <Typography variant="h2" color="white">Req Emp</Typography>
                <Typography variant="h1" color="white">{empReq && empReq.length}</Typography>

              </Link>
            </div>
            <hr />
            <div className='row box3 '>


              <div className="col-sm-5 mx-4 chartBox  ">
                <div className="row">
                  <div className="col-5 d-flex align-items-center">
                    <div className='text-end '>
                      <Typography variant="h1" color="white">Meter</Typography>
                      <div className='chart'>
                        <div className='bg-secondary' id='c1'></div> <Typography variant="h3" color="white">Request  </Typography><br />
                      </div>
                      <div className='chart'>
                        <div className='bg-success' id='c1'></div> <Typography variant="h3" color="white">Complete  </Typography><br />
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <PieChart className='pieChart'

                      data={[
                        { title: 'Request', value: getMeterReq && getMeterReq.length, color: 'gray' },
                        { title: 'Complete', value: getAccMeterReq && getAccMeterReq.length, color: 'green', },
                      ]}
                    />
                  </div>
                </div>




              </div>
              <div className="col-sm-5 mx-4 chartBox  " >
                <div className="row">
                  <div className="col-5 d-flex align-items-center">
                    <div >
                      <Typography variant="h1" color="white">Compaints</Typography>
                      <div className='chart'>
                        <div className='bg-secondary' id='c1'></div> <Typography variant="h3" color="white">Request  </Typography><br />
                      </div>
                      <div className='chart'>
                        <div className='bg-warning' id='c1'></div> <Typography variant="h3" color="white">Process  </Typography><br />
                      </div>
                      <div className='chart'>
                        <div className='bg-success' id='c1'></div> <Typography variant="h3" color="white">Complete  </Typography><br />
                      </div>
                    </div>

                  </div>
                  <div className="col-5">
                    <PieChart className='pieChart'

                      data={[
                        { title: 'Request', value: getComReq && getComReq.length, color: 'gray' },
                        { title: 'Process', value: getAccMeterReq && getAccMeterReq.length, color: 'orange', },
                        { title: 'Complete', value: getAccMeterReq && getAccMeterReq.length, color: 'green', },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6  ">



              </div>




            </div>
          </Box>
        </main>
      </div>
    }</Fragment>

  )
}

export default AdminAuth(Dashboard)