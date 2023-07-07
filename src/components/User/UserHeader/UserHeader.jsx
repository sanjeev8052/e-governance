import React from 'react'
import './UserHeader.css'
import { Dashboard } from '@mui/icons-material'
import AccountMenu from '../AccountMenu'
import { Link } from 'react-router-dom'
import { Typography, TextField } from '@mui/material'

const UserHeader = () => {
  return (
    <div className='header'>
      <div className="logo">
        <Typography variant="h2" color="WindowFrame">E-Governace</Typography>
      </div>

      <div className="navItem">
        <Link ></Link>
        <Link ><Dashboard />Deshboard</Link>
        <AccountMenu />
      </div>
    </div>
  )
}

export default UserHeader
