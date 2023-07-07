
import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Avatar, InputAdornment, makeStyles } from '@material-ui/core';
import { width } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { getAdmnProfileImage, updateAdminProfileImage, } from '../../Action/Admin/Login';
import { Add, Delete, Edit } from '@mui/icons-material';
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
const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = React.useState()
    const { adminProfileImage } = useSelector(state => state.admin)
    const [image, setImage] = React.useState(adminProfileImage);

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null)

    };

    const style = useStyle();

    const dispatch = useDispatch()

    React.useEffect(() => {
        // userData ? setUser(userData) : null
        adminProfileImage ? setImage(adminProfileImage) : null
    }, [adminProfileImage])



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
            dispatch(updateAdminProfileImage(formData))

        } else {
            alert("Pleas First Select Image...")
        }
    }
    const handleUploadImage = async () => {
        if (selectedFile) {

            const formData = new FormData();
            formData.append("image", selectedFile);
            const { data } = await axios.post('api/admin/upload', formData)

            data ? dispatch(getAdmnProfileImage()) : null
            data ? handleClose() : null
        } else {
            alert("Pleas First Select Image...")
        }
    }
    const handleDeleteImage = async () => {

        const { data } = await axios.delete('api/admin/upload/delete')
        data ? dispatch(getAdmnProfileImage()) : null
        data ? handleClose() : null
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setImage(adminProfileImage)
    };

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen}>
                Upload Image
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
                        adminProfileImage ?
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

export default  ImageUploader