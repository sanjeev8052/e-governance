import axios from "axios"

export const Addcomcat  = (complaintType) => async (dispatch) =>{
    try {
        dispatch({
            type: "addcomcatRequset"
        })
        const {data} = await axios.post(`/api/admin/addcomplaintcat`, complaintType)

        dispatch({
            type: "addcomcatSuccess",
            payload: data
        })
        dispatch(Getcomcat())
        
    } catch (error) {
        dispatch({
            type: "addcomcatFailuer",
            payload: error
        })
    }
}

export const Getcomcat  = () => async (dispatch) =>{
    try {
        dispatch({
            type: "getcomcatRequset"
        })
        const {data} = await axios.get(`/api/admin/getcomplaintcat`)

        dispatch({
            type: "getcomcatSuccess",
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: "getcomcatFailuer",
            payload: error
        })
    }
}

export const Delcomcat  = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "delcomcatRequset"
        })
        const {data} = await axios.delete(`/api/admin/deletecomplaintcat/${id}`)

        dispatch({
            type: "delcomcatSuccess",
            payload: data
        })
        dispatch(Getcomcat())
    } catch (error) {
        dispatch({
            type: "delcomcatFailuer",
            payload: error
        })
    }
}
export const Addbillcat  = (billsType) => async (dispatch) =>{
    try {
        dispatch({
            type: "addbillcatRequset"
        })
        const {data} = await axios.post(`/api/admin/addbillscat`, billsType)

        dispatch({
            type: "addbillcatSuccess",
            payload: data
        })
        dispatch(Getbillcat())
    } catch (error) {
        dispatch({
            type: "addbillcatFailuer",
            payload: error
        })
    }
}

export const Getbillcat  = () => async (dispatch) =>{
    try {
        dispatch({
            type: "getbillcatRequset"
        })
        const {data} = await axios.get(`/api/admin/getbillscat`)

        dispatch({
            type: "getbillcatSuccess",
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: "getbillcatFailuer",
            payload: error
        })
    }
}

export const Delbillcat  = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "delbillcatRequset"
        })
        const {data} = await axios.delete(`/api/admin/deletebillscat/${id}`)

        dispatch({
            type: "delbillcatSuccess",
            payload: data
        })
        dispatch(Getbillcat())
    } catch (error) {
        dispatch({
            type: "delbillcatFailuer",
            payload: error
        })
    }
}
export const Addmetercat  = (meterType) => async (dispatch) =>{
    try {
        dispatch({
            type: "addmetercatRequset"
        })
        const {data} = await axios.post(`/api/admin/addmetercat`, meterType)

        dispatch({
            type: "addemetercatSuccess",
            payload: data
        })
        dispatch(Getmetercat())
    } catch (error) {
        dispatch({
            type: "addmetercatFailuer",
            payload: error
        })
    }
}

export const Getmetercat  = () => async (dispatch) =>{
    try {
        dispatch({
            type: "getmetercatRequset"
        })
        const {data} = await axios.get(`/api/admin/getmetercat`)

        dispatch({
            type: "getmetercatSuccess",
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: "getmetercatFailuer",
            payload: error
        })
    }
}

export const Delmetercat  = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "delmetercatRequset"
        })
        const {data} = await axios.delete(`/api/admin/deletemetercat/${id}`)

        dispatch({
            type: "delmetercatSuccess",
            payload: data
        })
        
        dispatch(Getmetercat())
    } catch (error) {
        dispatch({
            type: "delmetercatFailuer",
            payload: error
        })
    }
}
export const Addcercat  = (certificateType) => async (dispatch) =>{
    try {
        dispatch({
            type: "addcercatRequset"
        })
        const {data} = await axios.post(`/api/admin/addcertificatecat`, certificateType)

        dispatch({
            type: "addcercatSuccess",
            payload: data
        })
        dispatch(Getcercat())
        
    } catch (error) {
        dispatch({
            type: "addcercatFailuer",
            payload: error
        })
    }
}

export const Getcercat  = () => async (dispatch) =>{
    try {
        dispatch({
            type: "getcercatRequset"
        })
        const {data} = await axios.get(`/api/admin/getcertificatecat`)

        dispatch({
            type: "getcercatSuccess",
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: "getcercatFailuer",
            payload: error
        })
    }
}

export const Delcercat  = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "delcercatRequset"
        })
        const {data} = await axios.delete(`/api/admin/deletecertificatecat/${id}`)

        dispatch({
            type: "delcercatSuccess",
            payload: data
        })
        dispatch(Getcercat())
    } catch (error) {
        dispatch({
            type: "delcercatFailuer",
            payload: error
        })
    }
}

export const Adddept  = (deptType) => async (dispatch) =>{
    try {
        dispatch({
            type: "addDeptRequset"
        })
        const {data} = await axios.post(`/api/admin/adddept`, deptType)

        dispatch({
            type: "addDeptSuccess",
            payload: data
        })
        dispatch(Getdept())
        
    } catch (error) {
        dispatch({
            type: "addDeptFailuer",
            payload: error
        })
    }
}

export const Getdept = () => async (dispatch) =>{
    try {
        dispatch({
            type: "getDeptRequset"
        })
        const {data} = await axios.get(`/api/admin/getdept`)

        dispatch({
            type: "getDeptSuccess",
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: "getDeptFailuer",
            payload: error
        })
    }
}

export const Deldept  = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "delDeptRequset"
        })
        const {data} = await axios.delete(`/api/admin/deletedept/${id}`)

        dispatch({
            type: "delDeptSuccess",
            payload: data
        })
        dispatch(Getdept())
    } catch (error) {
        dispatch({
            type: "delDeptFailuer",
            payload: error
        })
    }
}
