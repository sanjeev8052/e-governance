import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Add, CameraAlt,  Delete, Edit, } from '@mui/icons-material';
import { Avatar, InputAdornment, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getEmpProfileImage, updateEmpProfileImage,  } from '../../Action/Employee/register';

const useStyle = makeStyles({
    main: {
        textAlign: "center"
    },
    Avatar: {

        height: "10rem",
        width: "10rem",
        margin: "auto",
        boxShadow: "3px 3px 6px"
    }


})

const UpdateEmpImagedialogbox = () => {
    const [selectedFile, setSelectedFile] = React.useState()
    const {  empProfileImage } = useSelector(state => state.employee)
    const [image, setImage] = React.useState(empProfileImage);

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null)

    };

    const style = useStyle();

    const dispatch = useDispatch()

    React.useEffect(() => {
        // userData ? setUser(userData) : null
        empProfileImage ? setImage(empProfileImage) : null
    }, [empProfileImage])



    const handleImage = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file)

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const handleUpadteImage = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);
            handleClose();
            dispatch(updateEmpProfileImage(formData))

        } else {
            alert("Pleas First Select Image...")
        }
    }
    const handleUploadImage = async () => {
        if (selectedFile) {

            const formData = new FormData();
            formData.append("image", selectedFile);
            const { data } = await axios.post('api/employee/upload', formData)
            
            data ? dispatch(getEmpProfileImage()) : null
            data ? handleClose() : null
        } else {
            alert("Pleas First Select Image...")
        }
    }
    const handleDeleteImage = async () => {

        const { data } = await axios.delete('api/employee/upload/delete')
        data ? dispatch(getEmpProfileImage()) : null
        data ? handleClose() : null
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setImage(empProfileImage)
    };

  return (
    <div>
    <Button variant="outlined" onClick={handleClickOpen}>
        <CameraAlt />
    </Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle> To manage your Profile Avatar</DialogTitle>
        <DialogContent className={style.main}>
            <Avatar src={image} className={style.Avatar} />
            <TextField

                sx={{ margin: "2rem 0 ", }}
                id="name"
                onChange={handleImage}
                InputProps={{ startAdornment: (<InputAdornment position="start">   </InputAdornment>) }}
                type="file"

            /> <br />

            {
                empProfileImage ?
                    <>
                        <Button variant="contained" onClick={handleUpadteImage} color="primary">
                            <Edit />
                        </Button>
                        <Button sx={{ margin: "0 1rem" }} onClick={handleDeleteImage} variant="contained" color="primary">
                            <Delete />
                        </Button>
                    </>
                    : <Button variant="contained" onClick={handleUploadImage} color="primary">
                        <Add />
                    </Button>
            }

        </DialogContent>
        <DialogActions>

        </DialogActions>
    </Dialog>
</div>
  )
}

export default UpdateEmpImagedialogbox