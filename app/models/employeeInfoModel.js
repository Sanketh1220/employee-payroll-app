// requring the mongoose package to connect to mongoDB database
const mongoose = require('mongoose');
const Joi = require('express-joi-validation');
const bcrypt = require('bcrypt');
// const EmployeeInfoController = require('../controllers/employeeInfoController');
const SALT_WORK_FACTOR =  10;

const EmployeeInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{2,30}$/ 
    },
    // Joi.string().regex(/^[a-zA-Z ]{2,30}$/).required(),
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{2,30}$/
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type: String,
        required: true
    },
}, {
    // generates the time stamp the data is been added
    timestamps: true
});

EmployeeInfoSchema.pre('save', function(next) {
    var employee = this;

    // only hash the password if it has been modified (or is new)
    if (!employee.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(employee.password, salt, function (error, hash) {
            if (error) return next(error);

            // override the cleartext password with the hashed one
            employee.password = hash;
            next();
        });
    });
});

EmployeeInfoSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// exporting the model 
const EmployeeInfoModel = mongoose.model('EmployeeInfo', EmployeeInfoSchema);

class EmployeeModel {
    create (employeeInfoData, callBack) {
        const employee = new EmployeeInfoModel ({
            firstName: employeeInfoData.firstName,
            lastName: employeeInfoData.lastName,
            email: employeeInfoData.email,
            password: employeeInfoData.password
        });

        employee.save({}, (error, data) => {
            if(error){
                return callBack(error, null);
            }
            return callBack(null, data);
        });
    }
}

module.exports = new EmployeeModel();