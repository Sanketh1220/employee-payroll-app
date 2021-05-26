const mongoose = require("mongoose");

module.exports = () => {

    const url = 'mongodb://localhost:27017/employeeInfo';

    /**
     * included to remove DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
     * without the `useFindAndModify` option set to false are deprecated.
     */
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    // gives a native code
    mongoose.Promise = global.Promise;

    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connection is successfully established!");
    }).catch(error => {
        console.log("Error, Connection establishment failed", error);
        process.exit();
    });
}