import axios from "axios"

export const adminLogin = (admin) => async (dispatch) => {
    try {

        dispatch({
            type: "LoginRequest"
        })
        const {data} = await axios.post(`/api/admin/alogin`, admin, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "LoginSuccess",
            payload: data
        })

        // dispatch(LoadAdmin())
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error
        })

    }
};
export const LoadAdmin = (admin) => async (dispatch) => {
    try {

        dispatch({
            type: "LoadRequest"
        })
        const {data} = await axios.get(`/api/admin/profile`, admin)

        dispatch({
            type: "LoadSuccess",
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: "LoadFailure",
            payload: error
        })

    }
};
export const AdminLogout = () => async (dispatch) => {
    try {

        dispatch({
            type: "AdminLogoutRequest"
        })
        await axios.get(`/api/admin/logout`)

        dispatch({
            type: "AdminLogoutSuccess",
           
        })

    } catch (error) {
        dispatch({
            type: "AdminLogoutFailuer",
            payload: error
        })

    }
};


export const getAdmnProfileImage = () => async (dispatch) => {

    try {
        dispatch({
            type: "LoadadminProfileImageRequest",

        })
             const {data}  = await  axios.get(`api/admin/profile/image`)

        dispatch({
            type: "LoadadminProfileImageSuccess",

            payload:data
        })
    } catch (error) {
        dispatch({
            type: "LoadadminProfileImageFailuer",

            payload: error
        })
    }



}
export const updateAdminProfileImage = (formData) => async (dispatch) => {

    try {
        dispatch({
            type: "UpdateadminImageRequest",

        })
        const { data } = await axios.put('/api/admin/upload/update', formData)

        dispatch({
            type: "UpdateadminImageSuccess",

            payload:data
        })

        dispatch(getProfileImage())
    } catch (error) {
        dispatch({
            type: "UpdateadminImageFailuer",
            payload: error
        })
    }



}
