/**
 * requiring the mongoose package to connect to mongoDB database
 */
const mongoose = require('mongoose');

/**
 * requiring package "bcrypt" to authenticate the password
 */
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR =  10;

/**
 * schema created to store data as such into database
 */
const EmployeeInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{2,30}$/ 
    },
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

/**
 * created constant variable to assign schema
 */
const EmployeeInfoModel = mongoose.model('EmployeeInfo', EmployeeInfoSchema);

/**
 * created a class to write functions
 */
class EmployeeModel {

    /**
     * function written to create data into database
     * using the requested by 
     * @param {*} A valid employeeInfoData is expected
     * @param {*} callBack 
     */
    createInfo (employeeInfoData, callBack) {
        const employee = new EmployeeInfoModel ({
            firstName: employeeInfoData.firstName,
            lastName: employeeInfoData.lastName,
            email: employeeInfoData.email,
            password: employeeInfoData.password
        });

        console.log('models employee data' + employee);
        employee.save({}, (error, data) => {
            return((error)
                ? (callBack(error, null))
                : (callBack(null, data)));
        });
    }

    /**
     * @description function written to retrieve all data from database
     * @param {*} callBack 
     */
    findAll (callBack) {
        /**
         * finding a data of employee info using find() method  of mongoose
         */
        EmployeeInfoModel.find({}, (error, data) => {
            return((error)
                ? (callBack(error, null))
                : (callBack(null, data)));
        });   
    }

    /**
     * @description function written to update info into database
     * @param {*} A valid employeeData is expected
     * @param {*} callBack 
     */
    updateInfo (employeeId, employeeData, callBack) {
        /**
         * updating a data of a single employee info using findByIdAndUpdate() method  of mongoose
         */
        EmployeeInfoModel.findByIdAndUpdate( employeeId.employeeInfoId, {
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            password: employeeData.password
        }, {new : true}, (error, data) => {
            return((error)
                ? (callBack(error, null))
                : (callBack(null, data)));
        });
    }

    /**
     * @description function written to delete data of employee from database
     * @param {*} A valid employeeData is expected
     * @param {*} callBack 
     */
    deleteById(employeeData, callBack) {
        EmployeeInfoModel.findByIdAndRemove(employeeData.employeeInfoId, (error, data) => {
            return((error)
                ? (callBack(error, null))
                : (callBack(null, data)));
        } )
    }
    
    /**
     * @description gets a data according to ID
     * @param {*} employeeData 
     * @param {*} callBack 
     */
    getDataById(employeeData, callBack) {
        EmployeeInfoModel.findById(employeeData.employeeInfoId, (error, data) => {
            return((error)
                ? (callBack(error, null))
                : (callBack(null, data)));
        } )
    }

    loginEmployee (employeeData, callBack) {
        EmployeeInfoModel.findById(employeeData.employeeData.email, (error, data) => {
            return((error)
                ? (callBack(error, null))
                : (callBack(null, data)));
        })
    }
}

/**
 * exporting the class to utilize or call function created in this class
 */
module.exports = new EmployeeModel();