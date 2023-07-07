import { makeStyles, CircularProgress, Typography, Button, } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Footer from '../Layout/Footer/Footer'
import { feedbackSchema } from '../../ValidateSchema/Services'
import { useFormik } from 'formik'
import { Send, Delete, Key } from '@mui/icons-material'
import axios from 'axios'
import { useAlert } from 'react-alert'


const useStyle = makeStyles({
    mainDiv: {
        width: "98.9vw",
        height: "50vh",
        paddingTop: "15rem",
        background: "linear-gradient(to top right ,rgb(48, 94, 234),rgb(214, 245, 214))",

    },
    formDiv: {
        width: "40%",
        backgroundColor: "white",
        margin: "auto",
        padding: "2rem",
        borderRadius: "4px",
        boxShadow: "3px 3px 6px"

    }
})


const feedback = () => {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState();
    const [feedbacks, setFeedbacks] = useState();
    const [reload, setReload] = useState(false);
    const alert = useAlert();
    const initialvalues = {}

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({

        initialValues: initialvalues,
        validationSchema: feedbackSchema,

        onSubmit: async (values) => {
            try {
                setLoading(true)
                const { data } = await axios.post('api/user/feedback', values)
                setLoading(false)
                getFeedback()
                getFeedbacks()
                data.message && alert.success(data.message)
            } catch (error) {
                setLoading(false)
                alert.success(error.response.data.message)
            }
        }
    })

    useEffect(() => {
        getFeedback()
        getFeedbacks()
    }, [reload]);

    const getFeedback = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('api/get/feedback', values)
            setLoading(false)
            setFeedback(data.feedback)
        } catch (error) {
            setLoading(false)

        }
        setReload(false) 
    }
    const getFeedbacks = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('api/get/feedbacks', values)
            setLoading(false)
            setFeedbacks(data.feedbacks)

        } catch (error) {
            setLoading(false)

        }
    }
    const deleteFeedback = async (id) => {
        try {
            if (confirm("are you soure")) {
                setLoading(true)
                const { data } = await axios.delete(`api/delete/feedback/${id}`)
                getFeedback();
                getFeedbacks();
                setLoading(false)
                alert.success(data.message)

            }


        } catch (error) {
            setLoading(false)

        }
    }

    const style = useStyle()
    return (
        <div className={style.mainDiv}>
            <form onSubmit={handleSubmit} className={style.formDiv}>
                <Typography variant="h4" color="initial">Give FeedBack</Typography>
                <textarea style={{ width: "100%", padding: "10px" }} fullWidth className=' mt-4 s'
                    id=""
                    label=""
                    variant='outlined'
                    name='feedback'
                    onChange={handleChange}
                />
                {errors.feedback ? (
                    <Typography className='text-danger' >{errors.feedback}</Typography>
                ) : null}
                <Button type='sumbmit' className='mt-3' fullWidth variant="contained" color="primary">
                    {loading ? <CircularProgress /> : <> Send <Send /></>}
                </Button>

            </form>
            <div className="box2 " style={{ background: "linear-gradient(to top right ,rgb(48, 94, 234),rgb(214, 245, 214))",
                                            paddingTop:"2rem",
                                            margin:"2rem ",
                                            boxShadow:"3px 3px 6px ",
                                            borderRadius:"0.3rem",
                                        }}>
                <h1 className='mx-4 mt-3 text-center'>Your Feedback </h1>
                <hr />
                {feedback && feedback.length > 0 ?
                    <>

                        {

                            feedback?.map((data) => (
                                <div className='' Key={data._id}>
                                    <Typography className='mx-4' variant="h6" color="initial">{data.name}</Typography>
                                    <div className='d-felx'>
                                        <Typography className='mx-4 ' variant="body1" color="initial">{data.feedback}</Typography>
                                        <Button className='text-danger ' title='Delete Feedback' onClick={() => deleteFeedback(data._id)} variant="text" >
                                            {loading ? <CircularProgress /> : <Delete />}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }

                        <hr />
                    </>
                    : <Typography className='mx-4' variant="h6"
                    >
                        No Feedback
                    </Typography>
                }

                <h1 className='text-center mt-3 mx-4'>All Feedbacks </h1>
                <hr />
                {

                    feedbacks?.map((data) => (
                        <div className=''>
                            <Typography className='mx-4' variant="h6" color="initial">{data.name}</Typography>
                            <Typography className='mx-4' variant="body1" color="initial">{data.feedback}</Typography>
                            <hr />
                        </div>
                    ))
                }
            </div>

            <Footer />
        </div>
    )
}

export default feedback
