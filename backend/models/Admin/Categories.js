const mongoose = require("mongoose")

 const complaintCatSchema =  mongoose.Schema({
    complaintType : {
        type:String,
        required : true
    }
})
const billsCatSchema = mongoose.Schema({
    billsType: {
        type:String,
        required : true
    }
})

const CertificateCatSchema =  mongoose.Schema({
    certificateType : {
        type:String,
        required : true
    }
})
const MeterCatSchema =  mongoose.Schema({
    meterType : {
        type:String,
        required : true
    }
})
const deptSchema =  mongoose.Schema({
    deptType : {
        type:String,
        required : true
    }
})


  const ComplaintCat = mongoose.model("complaintcat" , complaintCatSchema)
  const BillsCat = mongoose.model("billscat" , billsCatSchema)
  const CertificateCat = mongoose.model("certificatecat" , CertificateCatSchema)
  const MeterCat = mongoose.model("metercat" , MeterCatSchema)
  const Dept = mongoose.model("depatment", deptSchema)

  module.exports = {
    ComplaintCat :ComplaintCat,
    BillsCat:BillsCat,
    CertificateCat:CertificateCat,
    MeterCat:MeterCat,
    Dept:Dept,
  }