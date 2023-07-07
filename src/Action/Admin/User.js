import axios from "axios";
export const getUser = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetUserRequset"
        })
        const {data} = await axios.get(`/api/admin/getuser`)

        dispatch({
            type: "GetUserSuccess",
            payload: data
        })
      
        
    } catch (error) {
        dispatch({
            type: "GetUserFailure",
            payload: error
        })
    }
}
export const BLockUser = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "BlockUserRequset"
        })
        const {data} = await axios.post(`api/admin/blockuser/${id}`)

        dispatch({
            type: "BlockUserSuccess",
            payload: data
        })
        dispatch(getUser())
        
    } catch (error) {
        dispatch({
            type: "BlockUserFailure",
            payload: error
        })
    }
}

export const getblkUser = () => async (dispatch) =>{
    try {
        dispatch({
            type: "GetblkUserRequest"
        })
        const {data} = await axios.get(`/api/admin/getblockuser`)

        dispatch({
            type: "GetblkUserSuccess",
            payload: data
        })
       
        
    } catch (error) {
        dispatch({
            type: "GetblkUserFailure",
            payload: error
        })
    }
}

export const unBlockUser = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: "unBlockUserRequest"
        })
        const {data} = await axios.post(`api/admin/unblockuser/${id}`)

        dispatch({
            type: "unBlockUserSuccess",
            payload: data
        })
       dispatch(getblkUser())
        
    } catch (error) {
        dispatch({
            type: "unBlockUserFailure",
            payload: error
        })
    }
}
