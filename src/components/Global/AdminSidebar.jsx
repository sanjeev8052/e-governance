import React, { useState, useEffect } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme, Button, Avatar } from '@mui/material'
import Logo from '../Images/Icons/login.png';
import { Link } from 'react-router-dom'
import { tokens } from "../../Global";
import { MenuOutlined, DashboardTwoTone, CoPresentTwoTone, Groups2TwoTone, SpeakerNotesTwoTone, CategoryTwoTone, CommentTwoTone, ReceiptTwoTone } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ImageUploader from './ImageUploader';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <MenuItem active={selected === title} style={{ color: colors.grey[900] }} onClick={() => setSelected(title)} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )

}
const AdminSidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { admin, adminProfileImage } = useSelector((state) => (state.admin))
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("empLogin")
  const [names, setNames] = useState()

  useEffect(() => {
    admin ? setNames(admin.name) : null
  }, [])

  return (
    <Box sx={{
      "& .pro-sidebar-inner": {
        background: `${colors.primary[400]} !important`
      },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important"
      },
      "& .pro-inner-item": {
        padding: "5px 35px 5px 20px !important"
      },
      "& .pro-inner-item:hover": {
        color: "#868dfb !important"
      },
      "& .pro-menu-item.active": {
        color: "#6870fa !important"
      },


    }}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* logo and menu icon */}
          <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[900]
            }}>
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="10px">
                <Typography variant='h4'>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* user */}
          {
            !isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Avatar alt="admin" src={adminProfileImage ? `http://localhost:5000/Profile/${adminProfileImage}` : null    } style={{ cursor: "pointer", borderRadius: "50%", height: "100px", width: "100px" }} />
                </Box>
                <Box textAlign="center">
                  <Typography variant='h3' color={colors.grey[900]} fontWeight="bold" sx={{ m: "10px 0px 0px 0px" }} >Hello {names}  </Typography>
                  <Typography variant="h4" color={colors.grey[900]} ><ImageUploader /></Typography>
                </Box>
              </Box>
            )}
          {/* menu item */}
          <Box paddingLeft={isCollapsed ? undefined : "3%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<DashboardTwoTone />}
              selected={selected}
              setSelected={setSelected}
            />

            <Menu iconShape="square" style={{ color: colors.grey[900], backgroundColor: colors.primary[400] }} >
              
              <SubMenu title="Employee" icon={<CoPresentTwoTone />} style={{ backgroundColor: colors.primary[400] }} >
                <Item
                  title="Empployee"
                  to="/aemployee"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="RequestedEmpployee"
                  to="/aremployee"
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            </Menu>
            <Item
              title="Users"
              to="/auser"
              icon={<Groups2TwoTone />}
              selected={selected}
              setSelected={setSelected}
            />

            <Menu iconShape="square" style={{ color: colors.grey[900], backgroundColor: colors.primary[400] }} >
             
              <SubMenu title="Complaint" icon={<SpeakerNotesTwoTone />} style={{ backgroundColor: colors.primary[400] }} >
                <Item
                  title="Complaint"
                  to="/acomplaint"

                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title=" Assign Complaint"
                  to="/assign"

                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Completed Complaint"
                  to="/completecom"

                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            </Menu>
            <Item
              title="Categories"
              to="/categories"
              icon={<CategoryTwoTone />}
              selected={selected}
              setSelected={setSelected}
            />

            <Menu iconShape="square" style={{ color: colors.grey[900], backgroundColor: colors.primary[400] }} >
              {/* <MenuItem>Employee</MenuItem> */}
              <SubMenu title="Bills" icon={<ReceiptTwoTone />} style={{ backgroundColor: colors.primary[400] }} >
                <Item
                  title="Add Bills"
                  to="/abills"

                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pending Bills"
                  to="/pbills"

                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Paid Bills"
                  to="/pabills"

                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            </Menu>
            <Menu iconShape="square" style={{ color: colors.grey[900], backgroundColor: colors.primary[400] }} >
              {/* <MenuItem>Employee</MenuItem> */}
              <SubMenu title="Manage Income Certificate" icon={<ReceiptTwoTone />} style={{ backgroundColor: colors.primary[400] }} >
                <Item
                  title="Income Certificate Request"
                  to="/getincomecerreq"

                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Accepted Income Certificate"
                  to="/getaccincomecerreq"

                  selected={selected}
                  setSelected={setSelected}
                />
               
              </SubMenu>
            </Menu>
            <Menu iconShape="square" style={{ color: colors.grey[900], backgroundColor: colors.primary[400] }} >
              {/* <MenuItem>Employee</MenuItem> */}
              <SubMenu title="Manage Caste Certificate" icon={<ReceiptTwoTone />} style={{ backgroundColor: colors.primary[400] }} >
                <Item
                  title="Caste Certificate Request"
                  to="/getcastcerreq"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Accepted  Caste Certificate"
                  to="/getacccastcerreq"
                  selected={selected}
                  setSelected={setSelected}
                />
               
              </SubMenu>
            </Menu>
            <Menu iconShape="square" style={{ color: colors.grey[900], backgroundColor: colors.primary[400] }} >
              {/* <MenuItem>Employee</MenuItem> */}
              <SubMenu title="Manage Meter Apply" icon={<ReceiptTwoTone />} style={{ backgroundColor: colors.primary[400] }} >
                <Item
                  title="Meter Request"
                  to="/getmeterreq"

                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Accepted Meter Request"
                  to="/getaccmeterreq"

                  selected={selected}
                  setSelected={setSelected}
                />
               
              </SubMenu>
            </Menu>
            <Item
              title="Feedback"
              to="/feedback"
              icon={<CommentTwoTone />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>
        </Menu>
      </ProSidebar>
    </Box >
  )
}

export default AdminSidebar