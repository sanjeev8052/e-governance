import axios from "axios"

export const getTempEmp = () => async (dispatch) =>{
    try {
        dispatch({
            type: "TempEmployeeRequest"
        })
        const {data} = await axios.get(`/api/admin/gettempemp`)

        dispatch({
            type: "TempEmployeeSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "TempEmployeeFailure",
            payload: error
        })
    }
}
export const conTempEmp = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "CEmployeeRequest"
        })
        const {data} = await axios.post(`/api/admin/employee/${id}`)

        dispatch({
            type: "CEmployeeSuccess",
            payload: data
        })        
        dispatch(getTempEmp())
        
    } catch (error) {
        dispatch({
            type: "CEmployeeFailure",
            payload: error
        })
    }
}
export const rejTempEmp = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "REmployeeRequest"
        })
        const {data} = await axios.delete(`/api/admin/rejectemp/${id}`)

        dispatch({
            type: "REmployeeSuccess",
            payload: data
        })        
        dispatch(getTempEmp())
        
    } catch (error) {
        dispatch({
            type: "REmployeeFailure",
            payload: error
        })
    }
}
export const getEmp = () => async (dispatch) =>{
    try {
        dispatch({
            type: "EmployeeRequest"
        })
        const {data} = await axios.get(`/api/admin/getemp`)

        dispatch({
            type: "EmployeeSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "EmployeeFailure",
            payload: error
        })
    }
}

export const blockEmp = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "BlockRequest"
        })
        const {data} = await axios.post(`/api/admin/blockemp/${id}`)

        dispatch({
            type: "BlockSuccess",
            payload: data
        })

        dispatch(getEmp())
         
    } catch (error) {
        dispatch({
            type: "BlockFailure",
            payload: error
        })
    }
}

export const getblkEmp = () => async (dispatch) =>{
    try {
        dispatch({
            type: "BlkEmployeeRequest"
        })
        const {data} = await axios.get(`api/admin/getblkemp`)

        dispatch({
            type: "BlkEmployeeSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "BlkEmployeeFailure",
            payload: error
        })
    }
}

export const getEmpDetails = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetEmpRequest"
        })
        const {data} = await axios.get(`/api/employee/get/eprofile`)

        dispatch({
            type: "GetEmpSuccess",
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: "GetEmpFailuer",
            payload: error
        })
    }
}
export const unblockEmp = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "UnBlockRequest"
        })
        const response = await axios.post(`/api/admin/unblockemp/${id}`)

        dispatch({
            type: "UnBlockSuccess",
            payload: response
        })
        dispatch(getblkEmp())
    } catch (error) {
        dispatch({
            type: "UnBlockFailure",
            payload: error
        })
    }
}