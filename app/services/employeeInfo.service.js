const EmployeeInfo = require('../models/employeeInfo.model.js');

EmployeeInfoSchema.pre('save', function (next) {
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

module.exports = class EmployeeInfoService{
    
    static async getAllEmployeeInfo() {
        try {
            const allEmployeeInfo = await EmployeeInfo.find();
            return allEmployeeInfo;
        } catch (error) {
            console.log('Could not fetch employee info' + error);
        }
    }

    static async createEmployeeInfo(data) {
        try {
            const newEmployee = {
                firstName: req.body.firstName || "Untitled First Name",
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
            const response = await new EmployeeInfo(newEmployee).save();
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async getEmployeeInfoById(employeeId) {
        try {
            const singleEmployeeInfo = await EmployeeInfo.findById({_id: employeeId});
            return singleEmployeeInfo;
        } catch (error) {
            console.log('Employee info not found.' + error);
        }
    }

    static async updateEmployeeInfo(firstName, lastName, email, password) {
        try {
            const updateEmployeeInfo = await EmployeeInfo.updateOne(
                {firstName, lastName, email, password});
            return updateEmployeeInfo;
        } catch (error) {
            console.log('Failed to update employee info' + error)
        }
    }

    static async deleteEmployeeInfo(employeeId) {
        try {
            const deletedEmployeeInfo = await EmployeeInfo.findOneAndDelete(employeeId);
            return deletedEmployeeInfo;
        } catch (error) {
            console.log('Failed to delete employee info' + error);
        }
    }
}