import React, { useEffect, useState } from 'react'
import { downloadSchema, downloadSchema3 } from '../../../ValidateSchema/Services'
import { useFormik } from 'formik'
import { TextField } from '@mui/material'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import axios from 'axios'
import Pdf from '../../Global/Pdf'

const BillReciept = () => {
    const [billData, setBillData] = useState()
    const [loading, setLoading] = useState(false);

    const initialValues = {
    }
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: downloadSchema3,
        onSubmit: async (values) => {

            try {
                // console.log(values)
                setLoading(true)
                const { data } = await axios.get(`api/admin/searchbill/${values.paymentId}`)
                setBillData(data[0])
                setLoading(false)

            } catch (error) {
                alert(error.response.data.message)
                setLoading(false)
            }
        }
    })
    return (
        <div>
            {billData ? undefined : <div className='box'>
                {!billData && <form onSubmit={handleSubmit}>
                    <div className="form">
                        <h1>Download Reciept</h1>
                        <Typography variant="h4" className='mt-5' color="initial">
                            Enter Payment ID
                        </Typography>
                        <TextField className='mb-5 mt-1' fullWidth
                            id=""
                            label=""
                            variant='outlined'
                            size='small'
                            name='paymentId'
                            onChange={handleChange}
                            type='number'
                            placeholder=' Enter Payment ID '
                        />
                        {errors.paymentId && (
                            <Typography className='text-danger'>{errors.paymentId}</Typography>
                        )}
                        <Button type='submit' variant="contained" className='mb-5' color="primary">
                            {loading ? <CircularProgress /> : "Search"}
                        </Button>
                    </div>
                </form>}


            </div>}
            {billData &&

                <div className="col-12 " style={{
                    width: "50%",
                    margin: "2rem auto"

                }}>
                    <div className='row' id="row">
                        <div className="col-sm-5">
                            <Typography variant="h6" color="initial">Tenament No</Typography><hr />
                            <Typography variant="h6" color="initial">Area Name</Typography><hr />
                            <Typography variant="h6" color="initial">Customenr Name </Typography><hr />
                            <Typography variant="h6" color="initial">Bill</Typography><hr />
                            <Typography variant="h6" color="initial">Bill Date</Typography><hr />
                            <Typography variant="h6" color="initial">Last Due Date</Typography><hr />
                            <Typography variant="h6" color="initial">Past Due Amount</Typography><hr />
                            <Typography variant="h6" color="initial">Amout</Typography>


                        </div>
                        <div className="col-sm-5">
                            <Typography variant="h6" color="initial">{billData.tenamentNo}</Typography><hr />
                            <Typography variant="h6" color="initial">{billData.area}</Typography><hr />
                            <Typography variant="h6" color="initial">{billData.ownerName}</Typography><hr />
                            <Typography variant="h6" color="initial">{billData.billType}</Typography><hr />
                            <Typography variant="h6" color="initial">{billData.addDate}</Typography><hr />
                            <Typography variant="h6" color="initial">{billData.lastDueDate}</Typography><hr />
                            <Typography variant="h6" color="initial">{billData.pastDueAmt}</Typography><hr />
                            <Typography variant="h6" color="initial">{billData.amount}</Typography>
                        </div>
                        <div className='col-10'>
                            <hr />
                            <div className="row">
                                <div className='col-6'>
                                    <Typography variant="h6" color="initial">Total Amount : {billData.totelAmt}</Typography>

                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <Pdf contentId="row" downloadFileName="Receipt" />
                    </div><br /><br />
                </div>

            }
        </div>

    )
}

export default BillReciept
