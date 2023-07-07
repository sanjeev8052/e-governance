import axios from "axios";


// For Get  Meter Apply Req
export const getMeterApplyReq = () => async (dispatch) => {
    try {
        dispatch({
            type: "getMeterReqRequset",
        })

        const { data } = await axios.get("api/getmeterreq", {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "getMeterReqSuccess",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "getMeterReqFailuer",
            payload: error
        })
    }
}

export const accMeterReq = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "acceptMeterReqRequset",
        })

        const { data } = await axios.post(`api/accmeterreq/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "acceptMeterReqSuccess",
            payload: data
        })

        dispatch(getMeterApplyReq())
    } catch (error) {
        dispatch({
            type: "acceptMeterReqFailuer",
            payload: error
        })
    }
}

export const rejMeterReq = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "rejectMeterReqRequset",
        })

        const { data } = await axios.delete(`api/rejmeterreq/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "rejectMeterReqSuccess",
            payload: data
        })

        dispatch(getMeterApplyReq())
    } catch (error) {
        dispatch({
            type: "rejectMeterReqFailuer",
            payload: error
        })
    }
}

export const getAcceptMeterReq = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAccMeterReqRequset",
        })

        const { data } = await axios.get("api/getaccmeterreq", {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "getAccMeterReqSuccess",
            payload: data
        })
      
    } catch (error) {
        dispatch({
            type: "getAccMeterReqFailuer",
            payload: error
        })
    }
}

