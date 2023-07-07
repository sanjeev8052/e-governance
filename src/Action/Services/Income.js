import axios from "axios";

export const getIncomeCer = () => async (dispatch) => {
    try {
        dispatch({
            type: "getIncomeCerReqRequset",
        })

        const { data } = await axios.get("api/getincomereq", {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "getIncomeCerReqSuccess",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "getIncomeCerReqFailuer",
            payload: error
        })
    }
}

export const accIncomeCerReq = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "acceptIncomeCerReqRequset",
        })

        const { data } = await axios.post(`api/accincomecerreq/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "acceptIncomeCerReqSuccess",
            payload: data
        })

        dispatch(getIncomeCer())
    } catch (error) {
        dispatch({
            type: "acceptIncomeCerReqFailuer",
            payload: error
        })
    }
}

export const rejIncomeCerReq = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "rejectIncomeCerReqRequset",
        })

        const { data } = await axios.delete(`api/rejincomecerreq/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "rejectIncomeCerReqSuccess",
            payload: data
        })

        dispatch(getIncomeCer())
    } catch (error) {
        dispatch({
            type: "rejectIncomeCerReqFailuer",
            payload: error
        })
    }
}

export const getAcceptIncomeCerReq = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAccIncomeCerReqRequset",
        })

        const { data } = await axios.get("api/getaccincomecerreq", {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "getAccIncomeCerReqSuccess",
            payload: data
        })
      
    } catch (error) {
        dispatch({
            type: "getAccIncomeCerReqFailuer",
            payload: error
        })
    }
}

