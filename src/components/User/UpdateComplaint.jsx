import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@mui/material/InputLabel';
import { tokens } from '../../Global'
import { Box, FormControl, MenuItem, Select, useTheme } from '@material-ui/core';
import { Send } from '@mui/icons-material';
import { Link, Navigate , useNavigate} from 'react-router-dom';
import Footer from '../Layout/Footer/Footer';
import bgImage from '../../Images/bgImage3.jpg'
import { useFormik } from 'formik'
import { complaintSchema } from '../../ValidateSchema/Services';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from '../../Action/User';
import Loader from '../Layout/Loader'
import { CompReq } from '../../Action/Services/Services';
import axios from 'axios';
import { getUser } from '../../Action/Admin/User';
import { Getdept } from '../../Action/Admin/Categories';
import { useAlert } from 'react-alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    Complaint: {



    },
    box: {
        width: "80%",
        margin: "4rem auto",
        backgroundColor: "white",
        boxShadow: "3px 3px 6px ",
        border: " solid 1px black"

    },
    compField: {
        padding: '2rem'
    },
    userField: {
        padding: '2rem',
        backgroundColor: "gray",
        borderRadius: "0 0 10px 10px",
    },

    fullInput: {
        width: "71%",
        marginBottom: "10px"

    },

    dropdown: {
        width: "71%",
        marginBottom: "15px",

    },
    button: {
        width: "71%"
    },
    error: {
        color: "red",
        marginBottom: "10px"
    },
    label: {
        marginTop: "15px"
    }
});

const UpdateComplaint = ({ id }) => {

    const initialvalues = {
        complaintType: "",
        city: "",
        streetAddress: "",
        area: "",
        pincode: "",
        complaintDesc: "",
    }

    const [values, setValues] = useState(initialvalues);

    const { getdept } = useSelector((state) => (state.services))
    const themes = useTheme()
    const colors = tokens(themes.palette.mode)
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const alert = useAlert();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(Getdept())
        resentComp();
    }, [open]);

    const resentComp = async () => {
        const { data } = await axios.get(`api/searchComp/${id}`)
        setValues(data)
    }

    const handleInput = (e) => {
        const { value, name } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const { data } = await axios.put(`api/updateComp/${id}`,values)
            alert.success(data.message)
            setLoading(false)
            setOpen(false);
           
        } catch (error) {
            setLoading(false)
            alert.error(error.response.data.message)

        }
    }

    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                View
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>


                    </Toolbar>
                </AppBar>
                <div className={classes.Complaint}>
                    {values && <form className={classes.box} >

                        <div className={classes.compField}>
                            <Typography variant="h2" sx={{ marginBottom: "20px" }} color="initial">Your Complaint</Typography>
                            <Typography variant="h3" className=' mb-3' color="initial">Compalint Type </Typography>
                            <FormControl fullWidth className=' mb-4'>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.complaintType}
                                    onChange={handleInput}
                                    name="complaintType"
                                >
                                    {
                                        getdept?.map((data) => (
                                            <MenuItem value={data.deptType}>{data.deptType}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                            <Typography variant="h3" color="initial">Address</Typography>
                            <TextField className={classes.fullInput}
                                id=""
                                placeholder='City'
                                variant='outlined'
                                size='small'
                                name='city'
                                value={values.city}
                                onChange={handleInput}
                                required
                            />
                            <TextField className={classes.fullInput}
                                id=""
                                placeholder='Street Address '
                                variant='outlined'
                                size='small'
                                name='streetAddress'
                                value={values.streetAddress}
                                onChange={handleInput}
                                required
                            />


                            <TextField className={classes.fullInput}
                                id=""
                                placeholder='Area Name '
                                variant='outlined'
                                size='small'
                                name='area'
                                value={values.area}
                                onChange={handleInput}
                                required
                            />

                            <TextField className={classes.fullInput}
                                id=""
                                placeholder='Zip No. '
                                variant='outlined'
                                size='small'
                                name='pincode'
                                value={values.pincode}
                                onChange={handleInput}
                                required
                            />


                            <Typography variant="h3" className=' mt-4' color="initial">Compplaint Description </Typography>
                            <textarea
                                style={{ width: "71%", marginBottom: "15px" }}
                                name="complaintDesc"
                                id="" rows="5"
                                value={values.complaintDesc}
                                onChange={handleInput}
                                required
                            />
                            <Button disabled={loading} className='mt-3 mb-3' onClick={handleSubmit} fullWidth variant="contained" color="primary">
                                Update
                            </Button>
                        </div>
                    </form>}
                </div>
            </Dialog>
        </div>
    );
}

export default UpdateComplaint