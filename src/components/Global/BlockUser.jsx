
import { Box, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, } from '@mui/material'
import { tokens } from '../../Global'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getblkUser, unBlockUser } from '../../Action/Admin/User'
import AdminAuth from '../ProtectedRoute/AdminAuth'
import { useAlert } from 'react-alert'

const BlockUser = () => {
  const alert = useAlert();
  const themes = useTheme()
  const colors = tokens(themes.palette.mode)
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const { loading, blkuser, unblkuser } = useSelector((state) => (state.admin))

  useEffect(() => {
    if (unblkuser) {
      alert.success(unblkuser.message)
      dispatch({ type: "clearMessage" })

    }
  }, [unblkuser])



  const handleClickOpen = () => {
    setOpen(true);
    dispatch(getblkUser())

  };

  const handleClose = () => {
    setOpen(false);
  };

  const unblock = (id) => {
    dispatch(unBlockUser(id))

  }

  return (
    <>
      <Box>
        <Button variant="contained" onClick={handleClickOpen} color="secondary" sx={{ borderRadius: "100px" }}>
          Block Users
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth="md"
          PaperProps={{ sx: { width: "80%", position: "fixed", m: 0, top: 20,} }} >
          <DialogTitle>
            <Typography variant="h4" color={colors.redAccent[400]}>Block Users</Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
              "& .MuiTable-root": {
                border: "none"
              },
              "& .MuiTableCell-root": {
                borderBottom: "none"
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300]
              },
              "& .MuiTableHead-root": {
                backgroundColor: colors.blueAccent[400],
                borderBottom: "none"
              }

            }}>

              <TableContainer component={Paper}  sx={{ backgroundColor: colors.primary[600] }}  >
                <Table size="medium" sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>MOblie No.</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Buttons</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: colors.primary[600]}}  >
                    {
                      blkuser <= 0 ? <TableRow>
                        <TableCell colSpan={6}>
                          <Typography sx={{ margin: "10px auto", width: "10rem" }} variant="h2" color="primary">No Blocked Employee Data</Typography>
                        </TableCell>
                      </TableRow>
                        :
                        blkuser?.map((data) => (
                          <TableRow key={data._id}  >
                            <TableCell >{data.name}</TableCell>
                            <TableCell >{data.mobile}</TableCell>
                            <TableCell >{data.email}</TableCell>
                            <TableCell > <Button color="success" variant="contained" sx={{ borderRadius: "100px" }}
                              onClick={() => { unblock(data._id) }}
                            >
                              Unblock
                            </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </DialogContent>
          <DialogActions sx={{ ml: "10px" }}>
            <Button onClick={handleClose} color="error" variant="contained" sx={{ borderRadius: "100px", mr: '10px', mb: '5px' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </>
  )
}

export default AdminAuth(BlockUser)