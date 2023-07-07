import axios from "axios"

export const AddBill  = (Details) => async (dispatch) =>{
    try {
        dispatch({
            type: "addBillRequset"
        })
        const {data} = await axios.post(`/api/admin/addbills`, Details)

        dispatch({
            type: "addBillSuccess",
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: "addBillFailuer",
            payload: error
        })
    }
}

export const GetPendingBill  = () => async (dispatch) =>{
    try {
        dispatch({
            type: "getPendingBillRequset"
        })
        const {data} = await axios.get(`/api/admin/getpendingbill`)

        dispatch({
            type: "getPendingBillSuccess",
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: "getPendingBillFailuer",
            payload: error
        })
    }
}
export const GetPaidBill  = () => async (dispatch) =>{
    try {
        dispatch({
            type: "getPaidBillRequset"
        })
        const {data} = await axios.get(`/api/admin/getpaidbill`)

        dispatch({
            type: "getPaidBillSuccess",
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: "getPaidBillFailuer",
            payload: error
        })
    }
}