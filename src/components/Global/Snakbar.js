import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar  from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Profile from '../User/Profile';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Snakbar = ({message,type}) => {
    const [open, setOpen] = React.useState(false);

        React.useEffect(() => {
            setOpen(true);
           
        }, [message])
    
      
    
    
        const handleClose = (event, reason) => {
            setOpen(false);
        };
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
    
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                    <Alert severity={type} sx={{ width: '100%' }}>
                        {message}
                       
                    </Alert>
                </Snackbar>
          
    
            </Stack>
  )
}

export default Snakbar



