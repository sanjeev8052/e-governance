import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Add, CameraAlt, CameraAltOutlined, CameraAltRounded, Delete, Edit, Image, SelectAll } from '@mui/icons-material';
import { Avatar, CircularProgress, InputAdornment, makeStyles } from '@material-ui/core';
import { width } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { getProfileImage, LoadUser, updateProfileImage } from '../../Action/User';
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

const UpadateImagedialog = () => {
    const [selectedFile, setSelectedFile] = React.useState()
    const { profileImage } = useSelector(state => state.user)
    const [image, setImage] = React.useState(profileImage);
    const [loading, setLoading] = React.useState(false)

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null)

    };

    const style = useStyle();

    const dispatch = useDispatch()

    React.useEffect(() => {
        // userData ? setUser(userData) : null
        profileImage ? setImage(profileImage) : null
    }, [profileImage])



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
            dispatch(updateProfileImage(formData))

        } else {
            alert("Pleas First Select Image...")
        }
    }
    const handleUploadImage = async () => {

        try {
            if (selectedFile) {
                setLoading(true)
                const formData = new FormData();
                formData.append("image", selectedFile);
                const { data } = await axios.post('api/upload', formData)
                data ? setLoading(false) : null
                data ? dispatch(getProfileImage()) : null
                data ? handleClose() : null
            } else {
                error ? setLoading(false) : null
                alert("Pleas First Select Image...")
            }
        } catch (error) {
            error ? setLoading(false) : null
        }

    }
    const handleDeleteImage = async () => {

        const { data } = await axios.delete('api/upload/delete')
        data ? dispatch(getProfileImage()) : null
        data ? handleClose() : null
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setImage(profileImage)
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
                        profileImage ?
                            <>
                                <Button variant="contained" onClick={handleUpadteImage} color="primary">
                                    <Edit />
                                </Button>
                                <Button sx={{ margin: "0 1rem" }} onClick={handleDeleteImage} variant="contained" color="primary">
                                    <Delete />
                                </Button>
                            </>
                            : <Button variant="contained" onClick={handleUploadImage} color="primary">
                                {loading ? <CircularProgress /> : <Add />}
                            </Button>
                    }

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UpadateImagedialog