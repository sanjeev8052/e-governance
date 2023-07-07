import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup, TextField, Typography, Button, InputAdornment } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Avatar, } from '@material-ui/core';

import AvatarImage from '../../Images/Avatar.png'
import Footer from '../Layout/Footer/Footer'
import { Done, Edit, Email, KeyboardReturn, Person, PhoneAndroid } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { updateProfile } from '../../Action/User'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import axios from 'axios'
import UpadateImagedialog from './UpadateImagedialog'
import { Skeleton } from '@mui/material';



const useStyle = makeStyles({
    input: {
        margin: "0.5rem   0 2rem 0",
        width: "100%"
    },
    Avatar: {

        height: "15rem",
        width: "15rem",
    }


})
const Profile = () => {
    const style = useStyle();
    const { profileImage, loading, editMessage } = useSelector(state => state.user)

    const { userData, error, } = useSelector(state => state.user)
    const [user, setUser] = useState({});
    const alert = useAlert();
    const dispatch = useDispatch();


    useEffect(() => {
        userData ? setUser(userData) : null
        editMessage ? alert.success(editMessage.message) : null
    }, [userData, editMessage]);
    const handleInput = (e) => {
        const { value, name } = e.target

        setUser({
            ...user,
            [name]: value
        })
    }
    const initialValues = {
        name: "",

    }
    const { values, touched, errors, handleBlur, handleSubmit } = useFormik({

        initialValues: initialValues,

        onSubmit: () => {
            dispatch(updateProfile(user, user._id))

        }

    })


    return (
        <>
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    <div className="main ">

                        <div className="row m-5">
                            <div className="col-sm-6 " style={{ display: "flex", justifyContent: "center" }}>

                                <div className="row">
                                    <div className="col-lg-12">
                                        {loading ? <Skeleton sx={{ width: "12rem", height: "12rem" }} /> : <img className='img' src={profileImage ?`http://localhost:5000/Profile/${profileImage}` : AvatarImage} alt="" />}
                                    </div>
                                    <div className="col-lg-12" style={{ margin: "2rem  0 0 3.2rem" }}>
                                        <UpadateImagedialog />
                                    </div>
                                </div>

                            </div>
                            <div id='details' className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography color="initial">Name   </Typography>
                                        <hr />
                                        <Typography color="initial">Email    </Typography>
                                        <hr />
                                        <Typography color="initial">Phone No </Typography>
                                        <hr />
                                    </div>
                                    <div className="col-sm-8">
                                        <Typography color="initial">{user && user.name}</Typography>
                                        <hr />
                                        <Typography color="initial">{user && user.email}</Typography>
                                        <hr />
                                        <Typography color="initial">{user && user.phone}</Typography>
                                        <hr />
                                    </div>
                                </div>
                                <Button variant="text"  component={Link} to="/" color="default">
                                    Back Home<KeyboardReturn />
                                </Button>
                            </div>
                        </div>
                        <hr />
                        <h2>Personal Details</h2>
                        <hr />
                        <div className="row">
                            <div className="col-sm-4">
                                <TextField className={style.input}
                                    id=""
                                    label=""
                                    variant='outlined'
                                    size='small'
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <Person /></InputAdornment>) }}
                                    placeholder='Enter Your Name'
                                    onChange={handleInput}
                                    name="name"
                                    value={user && user.name}
                                />
                                {user.gender &&
                                    <FormControl>

                                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            onChange={handleInput}
                                            name="gender"
                                            defaultValue={user.gender}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>}
                            </div>
                            <div className="col-sm-4">
                                <TextField className={style.input}
                                    id=""
                                    label=""
                                    variant='outlined'
                                    size='small'
                                    name='phone'
                                    placeholder='Enter Your phone'
                                    onChange={handleInput}
                                    value={user && user.phone}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <PhoneAndroid /></InputAdornment>) }}
                                />

                            </div>
                            <div className="col-sm-4">
                                <TextField className={style.input}
                                    id=""
                                    label=""
                                    variant='outlined'
                                    size='small'
                                    placeholder='Enter Your Email'
                                    value={user && user.email}
                                    name='email'
                                    onChange={handleInput}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <Email /></InputAdornment>) }}
                                />

                            </div>
                            <hr />
                            <h2>Your Address </h2>
                            <hr />
                            <div className="col-sm-4">
                                <Typography color="initial">Flat /House No</Typography>
                                <TextField className={style.input}
                                    id=""

                                    variant='outlined'
                                    size='small'
                                    placeholder='Flat/House No'
                                    name='houseNO'
                                    onChange={handleInput}
                                    value={user && user.houseNO}
                                />
                                <Typography color="initial">Society/Apartment Name</Typography>

                                <TextField className={style.input}
                                    id=""

                                    variant='outlined'
                                    size='small'
                                    placeholder='Society/Apartment Name'
                                    name="societyName"
                                    onChange={handleInput}
                                    value={user && user.societyName}
                                />
                            </div>
                            <div className="col-sm-4">
                                <Typography color="initial">Area</Typography>

                                <TextField className={style.input}
                                    id=""
                                    label=""
                                    variant='outlined'
                                    size='small'
                                    placeholder='Area'
                                    name="area"
                                    onChange={handleInput}
                                    value={user && user.area}
                                />
                                <Typography color="initial">State</Typography>

                                <TextField className={style.input}
                                    id=""
                                    label=""
                                    variant='outlined'
                                    size='small'
                                    placeholder='State'
                                    name="state"
                                    onChange={handleInput}
                                    value={user && user.state}
                                />
                            </div>
                            <div className="col-sm-4">
                                <Typography color="initial">City</Typography>

                                <TextField className={style.input}
                                    id=""
                                    label=""
                                    variant='outlined'
                                    size='small'
                                    placeholder='City'
                                    name="city"
                                    onChange={handleInput}
                                    value={user && user.city}
                                />
                                <Typography color="initial">Pincode No</Typography>

                                <TextField className={style.input}
                                    id=""
                                    label=""
                                    type="number"
                                    variant='outlined'
                                    size='small'
                                    placeholder='Pincode'
                                    name="pincode"
                                    onChange={handleInput}
                                    value={user && user.pincode}
                                />
                            </div>
                        </div><br />
                        <Button fullWidth type='submit' variant="contained" color="primary">
                            <Edit />Update
                        </Button>
                    </div>
                </form>
                <Footer />
            </div>
        </>

    )
}

export default Profile
