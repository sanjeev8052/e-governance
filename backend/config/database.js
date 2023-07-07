const mongoose = require("mongoose")

const ConnectDB = () => {
    try {

        const mongoUrl = "mongodb+srv://root:root@govcluster.0ibqh8b.mongodb.net/GOVCLUSTER?retryWrites=true&w=majority"
        //cconst mongoUrl = "mongodb://localhost:27017/E-Governance"
        mongoose.connect(mongoUrl, {
            
                useNewUrlParser: true,
                useUnifiedTopology: true
            
        }, () => {

            console.log('database is connected...')
        })
    } catch (error) {
        console.log("error")
    }
}

module.exports = ConnectDB



