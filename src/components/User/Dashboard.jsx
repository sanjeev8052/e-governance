import { Box, FormControl, Typography, Select, MenuItem, FormLabel, FormHelperText, Button, TableRow, TableCell } from '@material-ui/core'
import React from 'react'
import axios from 'axios'
import Header from '../Layout/Header/Header'
import { useEffect } from 'react'
import { useState } from 'react'
import UpdateComplaint from './UpdateComplaint'
import { useSelector, useDispatch } from 'react-redux'
import { LoadUser } from '../../Action/User'
import { Delete } from '@mui/icons-material'

const Dashboard = () => {
    const dispatch = useDispatch()

    const [call, setCall] = useState(false);
    const [recentCompData, setRecentCompData] = useState();
    const [compCopleteData, setcompCopleteData] = useState();
    const [transaction, setTransaction] = useState();
    const [status, setStatus] = useState(1);

    const { userData } = useSelector(state => state.user)
    useEffect(() => {
        userData && setTransaction(userData.paidBills)
    }, [userData]);


    console.log(transaction)
    useEffect(() => {
        resentComp();
        completeComp();
        dispatch(LoadUser())
    }, [call]);

    const resentComp = async () => {
        const { data } = await axios.get("api/searchCompByEmail")
        setRecentCompData(data)
    }
    const completeComp = async () => {
        const { data } = await axios.get("api/searchCompCompletebyUser")
        setcompCopleteData(data)
    }

    
    return (
        <Box className='box'>
            <Box className='main'>
                <div className='row'>
                    <div className="col-sm-8">

                        <Typography variant="h4" color="initial">Dashboard</Typography><hr />
                        {status == 1 && <div className="row">
                            <div className="col-lg-12">
                                <Typography variant="h4" className='text-center' color="initial">Resent Complaints</Typography>
                                {recentCompData && recentCompData <= 0 ?
                                    <Typography variant="h3" className='text-center text-warning' color="initial">{recentCompData.length}</Typography>
                                    :
                                    recentCompData?.map((data) => (
                                        <TableRow key={data._id}>
                                            <TableCell>Complaint Id :</TableCell>
                                            <TableCell>{data._id}</TableCell>
                                            <TableCell>
                                                <UpdateComplaint id={data._id} />
                                            </TableCell>


                                        </TableRow>

                                    ))
                                }

                            </div>

                            <div className="col-lg-12">
                                <Typography variant="h4" className='text-center' color="initial">Complete Complaints</Typography>
                                {compCopleteData && compCopleteData <= 0 ?
                                 <Typography variant="h3" className='text-success text-center' >{compCopleteData.length}</Typography>
                                    : compCopleteData?.map((data) => (
                                        <>
                                     
                                            <select style={{ width: "80%", fontSize: "20px", padding: "0.5rem" }}>
                                                <option  >Complaint Id : {data._id} </option>
                                                <option disabled >Complaint Tyep : {data.complaintType} </option>
                                                <option disabled >complaint Desc : {data.complaintDesc} </option>
                                                <option disabled >Compaint Data  : {data.date} </option>
                                                <option disabled >Complaint Complete Data: {data.completeDate} </option>         
                                            </select>
                                            {/* <Button className='text-danger'>
                                                <Delete />
                                            </Button> */}
                                        </>

                                    ))
                                }

                            </div>
                            <div className="col-lg-12">

                            </div>
                            <div className="col-lg-12"></div>
                        </div>}

                        {status == 2 && <div className="row">
                            <div className="col-lg-12">
                                <Typography variant="h4" className='text-center' color="initial">Your Transaction</Typography>
                                {transaction && transaction <= 0 ?
                                    <Typography variant="h3" className='text-center text-warning' color="initial">{recentCompData.length}</Typography>
                                    :
                                    transaction?.map((data) => (
                                        <>
                                            <select style={{ width: "80%", fontSize: "20px", padding: "0.5rem" }}>
                                                <option >Transaction Id : {data._id} </option>
                                                <option disabled >Tenament No: {data.tenamentNo} </option>
                                                <option disabled >Bill Type : {data.billType} </option>
                                                <option disabled >Name  : {data.ownerName} </option>
                                                <option disabled >Paid Amount : {data.totelAmt} </option>
                                                <option disabled >Date : {data.addDate} </option>
                                            </select>
                                            {/* <Button className='text-danger'>
                                                <Delete />
                                            </Button> */}
                                        </>

                                    ))

                                }

                            </div>


                            <div className="col-lg-12">

                            </div>
                            <div className="col-lg-12"></div>
                        </div>}

                        {status == 3 && <div className="row">
                            <div className="col-lg-12">
                                <Typography variant="h4" className='text-center' color="initial">Resent Complaints</Typography>
                                {recentCompData && recentCompData <= 0 ?
                                    <Typography variant="h3" className='text-center text-warning' color="initial">{recentCompData.length}</Typography>
                                    :
                                    recentCompData?.map((data) => (
                                        <TableRow key={data._id}>
                                            <TableCell>Complaint Id :</TableCell>
                                            <TableCell>{data._id}</TableCell>
                                            <TableCell>
                                                <UpdateComplaint id={data._id} />
                                            </TableCell>


                                        </TableRow>

                                    ))
                                }

                            </div>

                            <div className="col-lg-12">
                                <Typography variant="h4" className='text-center' color="initial">Complete Complaints</Typography>
                                {compCopleteData && <Typography variant="h3" className='text-success text-center' >{compCopleteData.length}</Typography>}
                                {compCopleteData && <Typography variant="h3" className='text-success text-center' >{status}</Typography>}

                            </div>
                            <div className="col-lg-12">

                            </div>
                            <div className="col-lg-12"></div>
                        </div>}
                    </div>


                    <div className="col-sm-4">

                        {/* <Button variant="contained" onClick={() => setCall(true)} color="primary">
                            Reload
                        </Button> */}
                        <FormControl fullWidth>

                            <FormLabel>Select Info Your Choice</FormLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="complaintType"
                                onChange={(e) => setStatus(e.target.value)}

                            >
                                <MenuItem value="1">Complaints</MenuItem>
                                <MenuItem value="2">Taransaction</MenuItem>
                               

                            </Select>
                        </FormControl>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default Dashboard
