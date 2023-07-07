import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const DashboardReducer = createReducer(initialState, 
    {
        GetCUserRequest: (state, action) => {
            state.loading = true;
    
        },
        GetCUserSuccess: (state, action) => {
            state.loading = false;
            state.cuser = action.payload;
    
        },
        GetCUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
    
        },


        GetCEmployeeRequest: (state, action) => {
            state.loading = true;
    
        },
        GetCEmployeeSuccess: (state, action) => {
            state.loading = false;
            state.cemp = action.payload;
    
        },
        GetCEmployeeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
    
        },


        GetCREmployeeRequest: (state, action) => {
            state.loading = true;
    
        },
        GetCREmployeeSuccess: (state, action) => {
            state.loading = false;
            state.cremp = action.payload;
    
        },
        GetCREmployeeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
    
        },
        GetCrComplaintRequest: (state, action) => {
            state.loading = true;
    
        },
        GetCrComplaintSuccess: (state, action) => {
            state.loading = false;
            state.crcom = action.payload;
    
        },
        GetCrComplaintFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
    
        },
        GetCaComplaintRequest: (state, action) => {
            state.loading = true;
    
        },
        GetCaComplaintSuccess: (state, action) => {
            state.loading = false;
            state.cacom = action.payload;
    
        },
        GetCaComplaintFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
    
        },
        GetCCComplaintRequest: (state, action) => {
            state.loading = true;
    
        },
        GetCCComplaintSuccess: (state, action) => {
            state.loading = false;
            state.cccom = action.payload;
    
        },
        GetCCComplaintFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
    
        },
        GetCPenBillsRequest: (state, action) => {
            state.loading = true;
    
        },
        GetCPenBillsSuccess: (state, action) => {
            state.loading = false;
            state.cpbills = action.payload;
    
        },
        GetCPenBillsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
    
        },
        GetCPaidBillsRequest: (state, action) => {
            state.loading = true;
    
        },
        GetCPaidBillsSuccess: (state, action) => {
            state.loading = false;
            state.cpaidbills = action.payload;
    
        },
        GetCPaidBillsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
    
        },
    });
