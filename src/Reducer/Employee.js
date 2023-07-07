import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const Employee = createReducer(initialState, {

    // For Register
    employeeRegRequest: (state) => {
        state.loading = true;
    },
    employeeRegSuccess: (state, action) => {
        state.loading = false;
        state.reg = action.payload;

    },
    employeeRegFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
    // For Login
    employeeLoginRequest: (state) => {
        state.loading = true;
    },
    employeeLoginSuccess: (state, action) => {
        state.loading = false;
        state.log = action.payload;

    },
    employeeLoginFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // For Get Details
    
    GetEmpRequest: (state) => {
        state.loading = true;
    },
    GetEmpSuccess: (state, action) => {
        state.loading = false;
        state.getEmpData = action.payload;

    },
    GetEmpFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    
    UpdateEmpProfileRequest: (state) => {
        state.loading = true;
    },
    UpdateEmpProfileSuccess: (state, action) => {
        state.loading = false;
        state.empEditMessage = action.payload
    },
    UpdateEmpProfileFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    LoadEmpProfileImageRequest: (state) => {
        state.loading = false;
    },
    LoadEmpProfileImageSuccess: (state, action) => {
        state.loading = false;
        state.empProfileImage = action.payload
    },
    LoadEmpProfileImageFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
    },
    UpdateEmpImageRequest: (state) => {
        state.loading = true;
    },
    UpdateEmpImageSuccess: (state, action) => {
        state.loading = false;
        state.Empudata = action.payload
    },
    UpdateEmpImageFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


});