import React from 'react'
import { Document, Page } from 'react-pdf';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography,Button } from '@mui/material'
import { useState } from 'react';
import ViwePdf from './ViwePdf';
const ViewPdf = () => {
   
    return (
        <Box >
            <Dialog open="true" maxWidth="md"
                PaperProps={{ sx: { width: "80%", position: "fixed", m: 0, top: 20, backgroundImage: 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)', } }} >
                <DialogTitle>
                    <Typography variant="h3" >View</Typography>
                </DialogTitle>
                <DialogContent>
                   <ViwePdf/>
                </DialogContent>
                <DialogActions sx={{ ml: "10px" }}>
                    <Button color="error" variant="contained" sx={{ borderRadius: "100px", mr: '10px', mb: '5px' }}  >
                        Back
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}

export default ViewPdf