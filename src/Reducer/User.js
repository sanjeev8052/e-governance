import { createReducer } from '@reduxjs/toolkit'

const initialState = {


}

export const userReducer = createReducer(initialState, {

    // Login Reducers........
    UserRagisterRequest: (state) => {
        state.loading = true;
    },
    UserRagisterSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = true
    },
    UserRagisterFailuer: (state, action) => {
        state.loading = false;
        state.rerror = action.payload;
        state.isAuthenticated = false
    },
    ClearRegisterMessage: (state) => {
        state.message = null;
        state.rerror = null;

    },


    // Ragister Reducers........
    UserLoginRequest: (state) => {
        state.loading = true;
    },
    UserLoginSuccess: (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
        state.isAuthenticated = true
    },
    UserLoginFailuer: (state, action) => {
        state.loading = false;
        state.LoginError = action.payload; 
        state.isAuthenticated = false
    },
    ClearLoginMessage: (state) => {
        state.message = null;
        state.LoginError = null;

    },



    // UserLoad Reducers........
    UserLoadRequest: (state) => {
        state.userLoading = true;
    }, 
    UserLoadSuccess: (state, action) => {
        state.userLoading = false;
        state.userData = action.payload;
        state.isAuthenticated = true
    },
    UserLoadFailuer: (state, action) => {
        state.userLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false

    },



    //logout User
    LogoutRequest: (state) => {
        state.loading = true;
    },
    LogoutSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false
    },
    LogoutFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    //  Fro forget Password
    ForgotPassRequest: (state) => {
        state.loading = true;
    },
    ForgotPassSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload
    },
    ForgotPassFailuer: (state, action) => {
        state.loading = false;
        state.Forgoterror = action.payload;
    },
    ForgotErrorMessage: (state, action) => {
        state.loading = false;
        state.Forgoterror = null
    },

    UpdateProfileRequest: (state) => {
        state.loading = true;
    },
    UpdateProfileSuccess: (state, action) => {
        state.editMessage = action.payload
        state.loading = false;
    },
    UpdateProfileFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    LoadProfileImageRequest: (state) => {
        state.loading = false;
    },
    LoadProfileImageSuccess: (state, action) => {
        state.loading = false;
        state.profileImage = action.payload
    },
    LoadProfileImageFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
    UpdateImageRequest: (state) => {
        state.loading = true;
    },
    UpdateImageSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload
    },
    UpdateImageFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // For deisplay feedback
    getFeedbackRequest: (state) => {
        state.loading = true;
    },
    getFeedbackSuccess: (state, action) => {
        state.loading = false;
        state.getfeedback = action.payload
    },
    getFeedbackFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

})
