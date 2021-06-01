/**
 * requiring 'dotenv' package
 */
require('dotenv').config();

require('../config.env');

const { config } = require('dotenv');
/**
 * constant variable created to require mongoose package and assigned to variable
 */
const mongoose = require("mongoose");

/**
 * @description function to connect to database
 * @returns connection
 */
function databaseConnection() {

    const URL = "mongodb://localhost:27017/employeeInfo";
    
    //included to remove DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
    //without the `useFindAndModify` option set to false are deprecated.
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    });

    return mongoose.connection
    .once('open', () => console.log('MongoDB Connected'))
    .on('error', (error)=> {
        console.log("Error found", error)
    });
}

/**
 * exporting function to utilize where it is imported
 */
module.exports = databaseConnection;