import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const AdminReducer = createReducer(initialState, 
    {
        clearMessage: (state) => {
            state.cempMs = null;
            state.remp = null;
            state.blockDataMs = null;
            state.unblkemp = null;
            state.BlkUser = null;
            state.unblkuser = null;
            state.AdminLog = null;
            state.error = null;
        },
    // Admin Login
    LoginRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.AdminLog= action.payload
        state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    // Admin logout
    AdminLogoutRequest: (state) => {
        state.loading = true;
    },
    AdminLogoutSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false
    },
    AdminLogoutFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
 

    // Loading
    LoadRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = false
    },
    LoadSuccess: (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
    },
    LoadFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false
    },


    // Get Temprary Employee
    TempEmployeeRequest: (state, action) => {
        state.loading = true;

    },
    TempEmployeeSuccess: (state, action) => {
        state.loading = false;
        state.empReq = action.payload;

    },
    TempEmployeeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },


    // Confirm Temprary Employee
    CEmployeeRequest: (state, action) => {
        state.loading = true;

    },
    CEmployeeSuccess: (state, action) => {
        state.loading = false;
        state.cempMs = action.payload;

    },
    CEmployeeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
    // Reject Temprary Employee
    REmployeeRequest: (state, action) => {
        state.loading = true;

    },
    REmployeeSuccess: (state, action) => {
        state.loading = false;
        state.remp = action.payload;

    },
    REmployeeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },


    //  Get Employee
    EmployeeRequest: (state, action) => {
        state.loading = true;

    },
    EmployeeSuccess: (state, action) => {
        state.loading = false;
        state.emp = action.payload;

    },
    EmployeeNull: (state, action) => {
        state.loading = false;
        state.emp = null
       
    },
    EmployeeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // Block Employee
    BlockRequest: (state, action) => {
        state.loading = true;

    },
    BlockSuccess: (state, action) => {
        state.loading = false;
        state.blockDataMs = action.payload;

    },
    BlockFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
    //  Get BLockEmployee
    BlkEmployeeRequest: (state, action) => {
        state.loading = true;

    },
    BlkEmployeeSuccess: (state, action) => {
        state.loading = false;
        state.blkemp = action.payload;

    },
    BlkEmployeeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // UnBlock Employee
    UnBlockRequest: (state, action) => {
        state.loading = true;

    },
    UnBlockSuccess: (state, action) => {
        state.loading = false;
        state.unblkemp = action.payload;

    },
    UnBlockFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // Get User 
    GetUserRequest: (state, action) => {
        state.loading = true;

    },
    GetUserSuccess: (state, action) => {
        state.loading = false;
        state.GetUser = action.payload;

    },
    GetUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // BLock User 
    BlockUserRequest: (state, action) => {
        state.loading = true;

    },
    BlockUserSuccess: (state, action) => {
        state.loading = false;
        state.BlkUser = action.payload;

    },
    BlockUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

     // Get Block User 
     GetblkUserRequest: (state, action) => {
        state.loading = true;

    },
    GetblkUserSuccess: (state, action) => {
        state.loading = false;
        state.blkuser = action.payload;

    },
    GetblkUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

     // UnBLock User 
     unBlockUserRequest: (state, action) => {
        state.loading = true;

    },
    unBlockUserSuccess: (state, action) => {
        state.loading = false;
        state.unblkuser = action.payload;

    },
    unBlockUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },


    // Images
    LoadadminProfileImageRequest: (state) => {
        state.loading = false;
    },
    LoadadminProfileImageSuccess: (state, action) => {
        state.loading = false;
        state.adminProfileImage = action.payload
    },
    LoadadminProfileImageFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
    },
    UpdateadminImageRequest: (state) => {
        state.loading = true;
    },
    UpdateadminImageSuccess: (state, action) => {
        state.loading = false;
        state.adminudata = action.payload
    },
    UpdateadminImageFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


});
