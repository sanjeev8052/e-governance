import './App.css'
// User
import Register from './components/User/Register'
import Login from './components/User/Login'
import Home from './components/Home/Home'
import { getProfileImage, LoadUser } from './Action/User'
import UserForgotPassword from './components/User/ForgotPassword'
import Profile from './components/User/Profile'
import ResetPassword from './components/User/ResetPassword'
import UserDashboard from './components/User/Dashboard'
import Download from './components/User/Download/Download'

// package
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ColorModeContext, useMode } from "./Global";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LoadAdmin, getAdmnProfileImage } from './Action/Admin/Login'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// admin
import AforgotPassword from './components/Admin/Aforgetpassword'
import AssignCom from './components/Admin/AssignCom'
import Dashboard from './components/Admin/Dashboard'
import AdminLogin from './components/Admin/AdminLogin'
import Employee from './components/Admin/Employee'
import RequestedEmployee from './components/Admin/RequestedEmployee'
import AdminComplaint from './components/Admin/AdminComplaint'
import User from './components/Admin/User'
import Categories from './components/Admin/Categories'
import Feedback from './components/Admin/Feedback'
import Feedback1 from './components/User/feedback'
import CompletedComplaint from './components/Admin/CompletedComplaint'
import Bills from './components/Admin/Bills'
import PendingBills from './components/Admin/PendingBills'
import PaidBills from './components/Admin/PaidBills'
import GetmeterReq from './components/Admin/GetmeterReq'
import AccMeterReq from './components/Admin/AccMeterReq'
import GetIncomeCer from './components/Admin/GetIncomeCer'
import GetAccIncome from './components/Admin/GetAccIncome'
import GetCastCer from './components/Admin/GetCastCer'
import GetAccCast from './components/Admin/GetAccCast'
import Tester from './components/Admin/Tester'
import UserHeader from './components/User/UserHeader/UserHeader'


// Employee
import Empregister from './components/Employee/Empregister'
import Emplogin from './components/Employee/Emplogin'
import Work from './components/Employee/Work'
import Feedbacke from './components/Employee/Feedbacke'
import EProfile from './components/Employee/Profile'
import EmpforgetPasswrod from './components/Employee/EmpforgetPasswrod'
import EmpreserPassword from './components/Employee/EmpreserPassword'

// Others
import AssignModel from './components/Global/AssignModel'
import Loader from './components/Layout/Loader'

// Services
import MeterApply from './components/Services/MeterApply'
import IncomeCer from './components/Services/IncomeCer'
import CastCer from './components/Services/CastCer'
import BillPay from './components/Services/BillPayment/BillPay'
import Complaint from './components/Services/Complaint'
import Temp from './components/Temp'
import { getEmpDetails, getEmpProfileImage } from './Action/Employee/register'
import ViewPdf from './components/Global/ViewPdf'
import cookies from 'js-cookie'
import AdminResetPassword from './components/Admin/AdminResetPassword'
import IncomeReciept from './components/User/Download/IncomeReciept'
import ContactUs from './components/User/ContactUs/ContactUs'
import axios from 'axios'
import Payment from './components/User/Payment'
import BillReciept from './components/User/Download/BillReciept'
const App = () => {

  const [stripKey, setStripKey] = useState("pk_test_51Mq1jRSHoUNuGuBowIIEwRf0LXA54XMZsQaErcuXbAncP3h8ec1dsII0W2UHJ1u7y3viBALYid9jhDanlmZ0789J00GMiaLqJ6");

  // async function getStripeKey() {
  //   const { data } = axios.get('/api/stripeKey')

  //   setStripKey(data.stripeKry)
  // }

  const dispatch = useDispatch();
  const { loginData } = useSelector(state => state.user)
  const { log } = useSelector(state => state.employee)
  const { AdminLog } = useSelector(state => state.admin)

  useEffect(() => {
    { loginData && cookies.set('Token', loginData.token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }) }
    { log && cookies.set('empToken', log.Emptoken, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }) }
    { AdminLog && cookies.set('adminToken', AdminLog.Admintoken, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }) }
  }, [loginData, log, AdminLog]);

  const [theme, colorMode] = useMode()
  useEffect(() => {
    dispatch(LoadUser())
    dispatch(LoadAdmin())
    dispatch(getEmpDetails())
    dispatch(getProfileImage())
    dispatch(getEmpProfileImage())
    dispatch(getAdmnProfileImage())
    // getStripeKey()
  }, [dispatch])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className=''>


          <Routes>
            {/* User */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='forgotpassword' element={<UserForgotPassword />} />
            <Route path='reset/password/:token' element={< ResetPassword />} />
            <Route path='/userHeader' element={<UserHeader />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/UserDashboard' element={<UserDashboard />} />
            <Route path='/Download' element={<Download />} />
            <Route path='/IncomeReciept' element={<IncomeReciept />} />
            <Route path='/BillReciept' element={<BillReciept />} />
            <Route path='/ufeedback' element={<Feedback1 />} />
            <Route path='/ContactUs' element={<ContactUs />} />



            {/* Services */}
            <Route path='/complaint' element={<Complaint />} />
            <Route path='/billpay' element={<BillPay />} />
            <Route path='/meterApply/' element={<MeterApply />} />
            <Route path='/incomeCer' element={<IncomeCer />} />
            <Route path='/castCer' element={<CastCer />} />
            <Route path='/Temp/' element={<Temp />} />
            <Route path='/view' element={<ViewPdf />} />
           
       
            {/* Admin */}


            <Route path='/adlogin' element={<AdminLogin />} />
            <Route path='/AforgotPassword' element={<AforgotPassword />} />
            <Route path='adminreset/password/:token' element={< AdminResetPassword />} />
            <Route path='/emplogin' element={<Emplogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aemployee" element={<Employee />} />
            <Route path="/aremployee" element={<RequestedEmployee />} />
            <Route path="/acomplaint" element={<AdminComplaint />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/auser" element={<User />} />
            <Route path="/spiner" element={<Loader />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/assign" element={<AssignCom />} />
            <Route path="/assigncom/:_id" element={<AssignModel />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/completecom" element={<CompletedComplaint />} />
            <Route path="/abills" element={<Bills />} />
            <Route path="/pbills" element={<PendingBills />} />
            <Route path="/pabills" element={<PaidBills />} />
            <Route path="/getmeterreq" element={<GetmeterReq />} />
            <Route path="/getaccmeterreq" element={<AccMeterReq />} />
            <Route path="/getincomecerreq" element={<GetIncomeCer />} />
            <Route path="/getaccincomecerreq" element={<GetAccIncome />} />
            <Route path="/getcastcerreq" element={<GetCastCer />} />
            <Route path="/getacccastcerreq" element={<GetAccCast />} />




            {/* Employee */}

            <Route path="/emplogin" element={<Emplogin />} />
            <Route path='/empregister' element={<Empregister />} />
            <Route path='/work' element={<Work />} />
            <Route path='eforgotpassword' element={<EmpforgetPasswrod />} />
            <Route path='empreset/password/:token' element={< EmpreserPassword />} />
            {/* <Route path="/emp/register" element={<Empregister/>} /> */}
            <Route path="/emplogin" element={<Emplogin />} />
            <Route path='/empregister' element={<Empregister />} />
            <Route path='/work' element={<Work />} />
            <Route path='/feedbacke' element={<Feedbacke />} />
            <Route path='/eprofile' element={<EProfile />} />
            {/* <Route path="/emp/register" element={<Empregister/>} /> */}


          </Routes>

        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
