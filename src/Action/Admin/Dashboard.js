import axios from "axios";

export const CountUser = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetCUserRequest"
        })
        const {data} = await axios.get(`/api/admin/countuser`)

        dispatch({
            type: "GetCUserSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "GetCUserFailure",
            payload: error
        })
    }
}


export const RequestedEmp = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetCEmployeeRequest"
        })
        const {data} = await axios.get(`/api/admin/countrequestemployee`)

        dispatch({
            type: "GetCEmployeeSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "GetCEmployeeFailure",
            payload: error
        })
    }
}
export const Employee = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetCEmployeeRequest"
        })
        const {data} = await axios.get(`/api/admin/countemployee`)

        dispatch({
            type: "GetCEmployeeSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "GetCREmployeeFailure",
            payload: error
        })
    }
}
export const ReqComplaint = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetCrComplaintRequest"
        })
        const {data} = await axios.get(`/api/admin/countcomplaint`)

        dispatch({
            type: "GetCrComplaintSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "GetCrComplaintFailure",
            payload: error
        })
    }
}
export const AccComplaint = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetCaComplaintRequest"
        })
        const {data} = await axios.get(`/api/admin/countacccomplaint`)

        dispatch({
            type: "GetCaComplaintSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "GetCaComplaintFailure",
            payload: error
        })
    }
}
export const ComComplaint = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetCCComplaintRequest"
        })
        const {data} = await axios.get(`/api/admin/countcompletecomplaint`)

        dispatch({
            type: "GetCCComplaintSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "GetCCComplaintFailure",
            payload: error
        })
    }
}

export const Penbills = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetCPenBillsRequest"
        })
        const {data} = await axios.get(`/api/admin/countpenbills`)

        dispatch({
            type: "GetCPenBillsSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "GetCPenBillsFailure",
            payload: error
        })
    }
}
export const PaidBills = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetCPaidBillsRequest"
        })
        const {data} = await axios.get(`/api/admin/countpaidbills`)

        dispatch({
            type: "GetCPaidBillsSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "GetCPaidBillsFailure",
            payload: error
        })
    }
}