const mongoose = require('mongoose')

const MeterApplySchema = mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    phone: {
        type: Number,
        require:true
    },
    meterType: {
        type: String,
        require:true
    },
    tenamentNo: {
        type: String,
        require:true
    }, 
    city: {
        type: String,
        require:true
    },
    streetAddress: {
        type: String,
        require:true
    }, 
    area: {
        type: String,
        require:true
    },
    proof:{
      type:String,
      require:true
        
    },
    status:String
})


module.exports = mongoose.model("MeterApply",MeterApplySchema)
