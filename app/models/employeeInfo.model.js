// requring the mongoose package to connect to mongoDB database
const mongoose = require('mongoose');

const EmployeeInfoSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
},{
    // generates the time stamp the data is been added
    timestamps: true
})

// exporting the model 
module.exports = mongoose.model('EmployeeInfo', EmployeeInfoSchema);