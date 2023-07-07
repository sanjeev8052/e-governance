import axios from "axios"

export const Register = (details) => async (dispatch) => {
    try {
        dispatch({
            type: "employeeRegRequest"
        })
         const { data } = await axios.post(`/api/employee/tempemployee`, details)

        dispatch({
            type: "employeeRegSuccess",
            payload: data
        })
       

    } catch (error) {
        dispatch({
            type: "employeeRegFailuer",
            payload: error
        })
    }
  
}

export const Login = (details) => async (dispatch) => {
    try {
        dispatch({
            type: "employeeLoginRequest"
        })
        const { data } = await axios.post(`/api/employee/elogin`, details)

        dispatch({
            type: "employeeLoginSuccess",
            payload: data
        })
        dispatch(getEmpDetails())

        return data

    } catch (error) {
        dispatch({
            type: "employeeLoginFailuer",
            payload: error
        })
    }
}
export const getEmpDetails = () => async (dispatch) => {
    try {
        dispatch({
            type: "GetEmpRequest"
        })
        const { data } = await axios.get(`api/employee/get/eProfile`)

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

export const updateEmpProfile = (user,id) => async (dispatch) => {

    try {
        dispatch({
            type: "UpdateEmpProfileRequest",
        })
             const {data}  = await  axios.post(`api/employee/update/profile/${id}`,user)

        dispatch({
            type: "UpdateEmpProfileSuccess",
            payload:data
        })
    } catch (error) {
        dispatch({
            type: "UpdateEmpProfileFailuer",
            payload: error
        })
    }



}

export const getEmpProfileImage = () => async (dispatch) => {

    try {
        dispatch({
            type: "LoadEmpProfileImageRequest",

        })
             const {data}  = await  axios.get(`api/employee/profile/image`)

        dispatch({
            type: "LoadEmpProfileImageSuccess",

            payload:data
        })
    } catch (error) {
        dispatch({
            type: "LoadEmpProfileImageFailuer",

            payload: error
        })
    }



}
export const updateEmpProfileImage = (formData) => async (dispatch) => {

    try {
        dispatch({
            type: "UpdateEmpImageRequest",

        })
        const { data } = await axios.put('/api/employee/upload/update', formData)

        dispatch({
            type: "UpdateEmpImageSuccess",

            payload:data
        })

        dispatch(getProfileImage())
    } catch (error) {
        dispatch({
            type: "UpdateEmpImageFailuer",
            payload: error
        })
    }



}