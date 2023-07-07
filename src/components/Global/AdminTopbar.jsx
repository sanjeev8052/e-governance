
import React, { useContext } from 'react'
import { ColorModeContext, tokens } from "../../Global";
import './admin.css'
import { Box, IconButton, useTheme,  Typography } from '@mui/material';

import {  DarkModeTwoTone, LightModeTwoTone,  SettingsTwoTone, ManageAccountsTwoTone, ExitToAppTwoTone } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AdminLogout } from '../../Action/Admin/Login';
import { useNavigate } from 'react-router-dom';

const AdminTopbar = () => {
  const themes = useTheme()
  const colors = tokens(themes.palette.mode)
  const colorModes = useContext(ColorModeContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = () => { 
    dispatch(AdminLogout())
    navigate("/adlogin")
   }
  return (

    <>

        <Box display="flex" justifyContent="space-between" p={2} >

          {/* search bar */}
          <Box
            display="flex"
            // backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
            <Typography variant="h1" color={colors.grey[600]}>E-Governance</Typography>
          </Box>
          {/* icon button */}
          <Box display="flex">

            <IconButton onClick={colorModes.toggleColorMode}>
              {themes.palette.mode === "light" ? (<DarkModeTwoTone />) : (<LightModeTwoTone />)}
            </IconButton>
            {/* <IconButton>
              <SettingsTwoTone />
            </IconButton> */}
            {/* <IconButton>
              <ManageAccountsTwoTone />
            </IconButton> */}
            <IconButton onClick={logout}>
              <ExitToAppTwoTone />
            </IconButton>
          </Box>
        </Box>
    
    </>
  )
}

export default AdminTopbar