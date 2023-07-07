import { createReducer } from '@reduxjs/toolkit'

const initialState = {


}

export const userServicesReducer = createReducer(initialState, {


    // for clear message
    clearMessage: (state) => {
        state.remp = null;
        state.cempMs = null;
        state.accComReqMs = null;
        state.error = null;
        state.rejComReqMs = null;
        state.delcomcatMs = null;
        state.billcatMs = null;
        state.delbillcatMs = null;
        state.metercatMs = null;
        state.delmetercatMs = null;
        state.cercatMs = null;
        state.delcercatMs = null;
        state.deptMs = null;
        state.delcercatMs = null;
        state.delCerMs = null;
        state.addbillMs = null;
        state.delbillcatMs = null;
       state.rejectCastCerReqMs = null;
       state.accCastCerReqMs = null;
       state.accIncomeCerReqMs = null;
       state.rejectIncomeCerReqMs = null;
       state.accComReqMs = null;
       state.rejComReqMs = null;
       state.accMeterReqMs = null;
       state.rejectMeterReqMs = null;
       state.cempMs = null;
       state.remp = null;
       state.blockDataMs = null;
       state.unblkemp = null;
       state.BlkUser = null;
       state.unblkuser = null;


    },
    //Compreq Reducers........
    CompReqRequset: (state) => {
        state.loading = true;
    },
    CompReqSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
       
    },
    CompReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;
       
        state.LoginError = action.payload;
    },
    CompReqClear : (state)=>{
        state.data = null
    },

    // get complaint request
    getCompReqRequset: (state) => {
        state.loading = true;
    },
    getCompReqSuccess: (state, action) => {
        state.loading = false;
        state.getComReq = action.payload;

    },
    getCompReqFailuer: (state, action) => {
        state.loading = false;
        state.LoginError = action.payload;

    },

    // Accept Complaint Request
    AcceptCompReqRequset: (state) => {
        state.loading = true;
    },
    AcceptCompReqSuccess: (state, action) => {
        state.loading = false;
        state.accComReqMs = action.payload;

    },
    AcceptCompReqFailuer: (state, action) => {
        state.loading = false;
        state.LoginError = action.payload;

    },
    // Reject Complaint Request
    RejectCompReqRequset: (state) => {
        state.loading = true;
    },
    RejectCompReqSuccess: (state, action) => {
        state.loading = false;
        state.rejComReqMs = action.payload;

    },
    RejectCompReqFailuer: (state, action) => {
        state.loading = false;
        state.LoginError = action.payload;

        

    },

    // get accpeted complaint request
    getAccComRequset: (state) => {
        state.loading = true;
    },
    getAccComSuccess: (state, action) => {
        state.loading = false;
        state.getAccReq = action.payload;

    },
    getAccComFailuer: (state, action) => {
        state.loading = false;
        state.LoginError = action.payload;

    },
    // For Load Compllaint
    laodComRequset: (state) => {
        state.loading = true;
    },
    laodComSuccess: (state, action) => {
        state.loading = false;
        state.loadcom = action.payload;

    },
    laodComFailuer: (state, action) => {
        state.loading = false;
        state.LoginError = action.payload;

    },


    // for add complaint category
    addcomcatRequset: (state) => {
        state.loading = true;
    },
    addcomcatSuccess: (state, action) => {
        state.loading = false;
        state.comcatMs = action.payload;

    },
    addcomcatFailuer: (state, action) => {
        state.loading = false;
        state.LoginError = action.payload;

    },

    // for get complaint category
    getcomcatRequset: (state) => {
        state.loading = true;
    },
    getcomcatSuccess: (state, action) => {
        state.loading = false;
        state.getcomcat = action.payload;

    },
    getcomcatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for delete complaint category
    delcomcatRequset: (state) => {
        state.loading = true;
    },
    delcomcatSuccess: (state, action) => {
        state.loading = false;
        state.delcomcatMs = action.payload;

    },
    delcomcatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
    // for add bills category
    addbillcatRequset: (state) => {
        state.loading = true;
    },
    addbillcatSuccess: (state, action) => {
        state.loading = false;
        state.billcatMs = action.payload;

    },
    addbillcatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for get bills category
    getbillcatRequset: (state) => {
        state.loading = true;
    },
    getbillcatSuccess: (state, action) => {
        state.loading = false;
        state.getbillcat = action.payload;

    },
    getbillcatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for delete bills category
    delbillcatRequset: (state) => {
        state.loading = true;
    },
    delbillcatSuccess: (state, action) => {
        state.loading = false;
        state.delbillcatMs = action.payload;

    },
    delbillcatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
    // for add meter category
    addmetercatRequset: (state) => {
        state.loading = true;
    },
    addemetercatSuccess: (state, action) => {
        state.loading = false;
        state.metercatMs = action.payload;

    },
    addmetercatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for get meter category
    getmetercatRequset: (state) => {
        state.loading = true;
    },
    getmetercatSuccess: (state, action) => {
        state.loading = false;
        state.getmetercat = action.payload;

    },
    getmetercatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for delete meter category
    delmetercatRequset: (state) => {
        state.loading = true;
    },
    delmetercatSuccess: (state, action) => {
        state.loading = false;
        state.delmetercatMs = action.payload;

    },
    delmetercatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
    // for add certificate category
    addcercatRequset: (state) => {
        state.loading = true;
    },
    addcercatSuccess: (state, action) => {
        state.loading = false;
        state.cercatMs = action.payload;

    },
    addcercatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for get certificate category
    getcercatRequset: (state) => {
        state.loading = true;
    },
    getcercatSuccess: (state, action) => {
        state.loading = false;
        state.getcercat = action.payload;

    },
    getcercatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for delete certificate category
    delcercatRequset: (state) => {
        state.loading = true;
    },
    delcercatSuccess: (state, action) => {
        state.loading = false;
        state.delcercatMs = action.payload;

    },
    delcercatFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

      // for add  dept
    addDeptRequset: (state) => {
        state.loading = true;
    },
    addDeptSuccess: (state, action) => {
        state.loading = false;
        state.deptMs = action.payload;

    },
   addDeptFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for get Dept
    getDeptRequset: (state) => {
        state.loading = true;
    },
    getDeptSuccess: (state, action) => {
        state.loading = false;
        state.getdept = action.payload;

    },
    getDeptFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for delete certificate category
    delDeptRequset: (state) => {
        state.loading = true;
    },
    delDeptSuccess: (state, action) => {
        state.loading = false;
        state.delCerMs = action.payload;

    },
    delDeptFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

      // for Add Bills
      addBillRequset: (state) => {
        state.loading = true;
    },
    addBillSuccess: (state, action) => {
        state.loading = false;
        state.addbillMs = action.payload;

    },
   addBillFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

    // for get Pending Bill
    getPendingBillRequset: (state) => {
        state.loading = true;
    },
    getPendingBillSuccess: (state, action) => {
        state.loading = false;
        state.getpenbill = action.payload;

    },
    getPendingBillFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
    // for get Paid Bill
    getPaidBillRequset: (state) => {
        state.loading = true;
    },
    getPaidBillSuccess: (state, action) => {
        state.loading = false;
        state.getpaidbill = action.payload;

    },
    getPaidBillFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
     // for get Meter Req
     getMeterReqRequset: (state) => {
        state.loading = true;
    },
    getMeterReqSuccess: (state, action) => {
        state.loading = false;
        state.getMeterReq = action.payload;

    },
    getMeterReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
     // for Accept Meter Req
     acceptMeterReqRequset: (state) => {
        state.loading = true;
    },
    acceptMeterReqSuccess: (state, action) => {
        state.loading = false;
        state.accMeterReqMs = action.payload;

    },
    acceptMeterReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

     // for Reject  Meter Req
     rejectMeterReqRequset: (state) => {
        state.loading = true;
    },
    rejectMeterReqSuccess: (state, action) => {
        state.loading = false;
        state.rejectMeterReqMs = action.payload;

    },
    rejectMeterReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
     // for Get Accepted  Meter Req
     getAccMeterReqRequset: (state) => {
        state.loading = true;
    },
    getAccMeterReqSuccess: (state, action) => {
        state.loading = false;
        state.getAccMeterReq = action.payload;

    },
    getAccMeterReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

     // for get Incmome Certificate Req
     getIncomeCerReqRequset: (state) => {
        state.loading = true;
    },
    getIncomeCerReqSuccess: (state, action) => {
        state.loading = false;
        state.getIncomeCerReq = action.payload;

    },
    getIncomeCerReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
     // for AcceptIncome Cer Req
     acceptIncomeCerReqRequset: (state) => {
        state.loading = true;
    },
    acceptIncomeCerReqSuccess: (state, action) => {
        state.loading = false;
        state.accIncomeCerReqMs = action.payload;

    },
    acceptIncomeCerReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

     // for Reject  Income Cer Req
     rejectIncomeCerReqRequset: (state) => {
        state.loading = true;
    },
    rejectIncomeCerReqSuccess: (state, action) => {
        state.loading = false;
        state.rejectIncomeCerReqMs = action.payload;

    },
    rejectIncomeCerReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
     // for Get Accepted  Income Cer Req
     getAccIncomeCerReqRequset: (state) => {
        state.loading = true;
    },
    getAccIncomeCerReqSuccess: (state, action) => {
        state.loading = false;
        state.getAccIncomeCerReq = action.payload;

    },
    getAccIncomeCerReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
     // for get Cast Certificate Req
     getCastCerReqRequset: (state) => {
        state.loading = true;
    },
    getCastCerReqSuccess: (state, action) => {
        state.loading = false;
        state.getCastCerReq = action.payload;

    },
    getCastCerReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
     // for Accept Cast Cer Req
     acceptCastCerReqRequset: (state) => {
        state.loading = true;
    },
    acceptCastCerReqSuccess: (state, action) => {
        state.loading = false;
        state.accCastCerReqMs = action.payload;

    },
    acceptCastCerReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },

     // for Reject  Cast Cer Req
     rejectCastCerReqRequset: (state) => {
        state.loading = true;
    },
    rejectCastCerReqSuccess: (state, action) => {
        state.loading = false;
        state.rejectCastCerReqMs = action.payload;

    },
    rejectCastCerReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },
     // for Get Accepted  Cast Cer Req
     getAccCastCerReqRequset: (state) => {
        state.loading = true;
    },
    getAccCastCerReqSuccess: (state, action) => {
        state.loading = false;
        state.getAccCastCerReq = action.payload;

    },
    getAccCastCerReqFailuer: (state, action) => {
        state.loading = false;
        state.error = action.payload;

    },


    

})
