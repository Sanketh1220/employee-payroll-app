// requring the mongoose package to connect to mongoDB database
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR =  10;

const EmployeeInfoSchema = new mongoose.Schema({
    // required: ["firstName", "lastName", "email", "password"],
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
        bcrypt.hash(employee.password, salt, function (err, hash) {
            if (err) return next(err);

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
module.exports = mongoose.model('EmployeeInfo', EmployeeInfoSchema);