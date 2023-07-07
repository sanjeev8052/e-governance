import axios from "axios";

export const getCastCer = () => async (dispatch) => {
    try {
        dispatch({
            type: "getCastCerReqRequset",
        })

        const { data } = await axios.get("api/getcastreq", {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "getCastCerReqSuccess",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "getCastCerReqFailuer",
            payload: error
        })
    }
}

export const accCastCerReq = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "acceptCastCerReqRequset",
        })

        const { data } = await axios.post(`api/acccastcerreq/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "acceptCastCerReqSuccess",
            payload: data
        })

        dispatch(getCastCer())
    } catch (error) {
        dispatch({
            type: "acceptCastCerReqFailuer",
            payload: error
        })
    }
}

export const rejCastCerReq = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "rejectCastCerReqRequset",
        })

        const { data } = await axios.delete(`api/rejcastcerreq/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "rejectCastCerReqSuccess",
            payload: data
        })

        dispatch(getCastCer())
    } catch (error) {
        dispatch({
            type: "rejectCastCerReqFailuer",
            payload: error
        })
    }
}

export const getAcceptCastCerReq = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAccCastCerReqRequset",
        })

        const { data } = await axios.get("api/getacccastcerreq", {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "getAccCastCerReqSuccess",
            payload: data
        })
      
    } catch (error) {
        dispatch({
            type: "getAccCastCerReqFailuer",
            payload: error
        })
    }
}

