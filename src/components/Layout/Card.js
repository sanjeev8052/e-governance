import React from 'react'
var Slider = require('react-slick');
import { Button, makeStyles, Typography } from '@material-ui/core'
import complaintImage from '../../Images/complaint.jpg'
import billPayImage from '../../Images/billpay.jpg'
import certificateImage from '../../Images/certificate.png'
import registerImage from '../../Images/registration.jpg'
import meterImage from '../../Images/meter.png'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const css = {
    cardBox: {

        background: "linear-gradient(to top right ,rgb(48, 94, 234),rgb(214, 245, 214))",
        
        padding: "2rem",
        margin: "2rem",
        border: " solid 1px",
        borderRadius: "4px",
        backgroundSize: "cover"


    },
    card: {
        margin: "2rem",
        borderRadius: "4px",
        boxShadow: "3px 3px 6px ",
        backgroundColor: "white",
        border: " solid 1px",
        width: "23rem",
        padding: "2rem"
    },

    button: {

        width: "100%",
        color: "primary",
        marginTop: "1rem "
    },
    img: {
        height: "17rem",
        width: "19rem",
        border: " solid 1px",
        borderRadius: "5px",
      
        marginBottom: "1rem"
    }

}
const Card = () => {


    return (
        <>
            <div className="row" style={css.cardBox}>
                <div className="col-sm-4">
                    <div style={css.card}>
                        <img style={css.img} src={complaintImage} alt="Card" />
                        <div className="card-body">
                            <Typography sx={{ margin: "1rem" }} variant="h6" color="initial">Register your complaint and track the complaint status. </Typography>
                            <Button style={css.button} variant="text" color="default">
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button style={css.button} variant="contained" color='primary' {...bindTrigger(popupState)}>
                                                Complaint
                                            </Button>
                                            <Menu  {...bindMenu(popupState)}>
                                                <MenuItem component={Link} to='/complaint'>Add New Complaint</MenuItem>
                                               
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>

                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div style={css.card}>
                        <img style={css.img} src={billPayImage} alt="Card" />
                        <div className="card-body">
                            <Typography sx={{ margin: "1rem" }} variant="h6" color="initial">Cechk Your Panding Bills,Pay and Download Reciept </Typography>
                            <Button style={css.button} variant="text" color="default">
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button style={css.button} variant="contained" color='primary' {...bindTrigger(popupState)}>
                                                Bill payment
                                            </Button>
                                            <Menu  {...bindMenu(popupState)}>
                                                <MenuItem component={Link} to='/billPay'>New Payment</MenuItem>
                                                <MenuItem component={Link} to='/BillReciept'>Download</MenuItem>
                                                <MenuItem onClick={popupState.close}>Your Transactions</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>

                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div style={css.card}>
                        <img style={css.img} src={meterImage} alt="Card" />
                        <div className="card-body">
                            <Typography sx={{ margin: "1rem" }} variant="h6" color="initial">Apply For Meters</Typography>
                            <Button style={css.button} variant="text" color="default">
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button style={css.button} variant="contained" color='primary' {...bindTrigger(popupState)}>
                                                Apply Meter
                                            </Button>
                                            <Menu  {...bindMenu(popupState)}>
                                                <MenuItem component={Link} to='meterApply'>Apply Meter</MenuItem>
                                               
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>

                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div style={css.card}>
                        <img style={css.img} src={certificateImage} alt="Card" />
                        <div className="card-body">
                            <Typography sx={{ margin: "1rem" }} variant="h6" color="initial">Apply For Income Certificae and Download Income Certificate. </Typography>
                            <Button style={css.button} variant="text" color="default">
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button style={css.button} variant="contained" color='primary' {...bindTrigger(popupState)}>
                                                Apply Income Certificate
                                            </Button>
                                            <Menu  {...bindMenu(popupState)}>
                                                <MenuItem component={Link} to='incomeCer'>Apply For  Income Certificate</MenuItem>
                                                <MenuItem component={Link} to='IncomeReciept'>Download Certificate</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>

                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div style={css.card}>
                        <img style={css.img} src={certificateImage} alt="Card" />
                        <div className="card-body">
                            <Typography sx={{ margin: "1rem" }} variant="h6" color="initial">Apply For Caste Certificae and Download Caste Certificate. </Typography>
                            <Button style={css.button} variant="text" color="default">
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button style={css.button} variant="contained" color='primary' {...bindTrigger(popupState)}>
                                                Apply Caste Certificate
                                            </Button>
                                            <Menu  {...bindMenu(popupState)}>
                                                <MenuItem component={Link} to='castCer'>Apply For  Caste Certificate</MenuItem>
                                                <MenuItem component={Link} to='Download' >Download Certificate</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>

                            </Button>
                        </div>
                    </div>
                </div> 
                  {/* <div className="col-sm-4">
                    <div style={css.card}>
                        <img style={css.img} src={registerImage} alt="Card" />
                        <div className="card-body">
                            <Typography sx={{ margin: "1rem" }} variant="h6" color="initial">Apply For Cast Certificae and Download Cast Certificate. </Typography>
                            <Button style={css.button} variant="text" color="default">
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button style={css.button} variant="contained" color='primary' {...bindTrigger(popupState)}>
                                               Registration
                                            </Button>
                                            <Menu  {...bindMenu(popupState)}>
                                                <MenuItem component={Link} to='castCer'>New Registration</MenuItem>
                                                <MenuItem component={Link} to='Download' >Download Certificate</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>

                            </Button>
                        </div>
                    </div>
                </div> */}
            </div>


        </>


    )
}

export default Card
