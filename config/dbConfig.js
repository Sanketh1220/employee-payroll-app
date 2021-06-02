/**
 * requiring 'dotenv' package
 */
require('dotenv').config();

require('../.env');

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
    .once('open', () => console.log('MongoDB is Connected!'))
    .on('error', (error)=> {
        console.log("Error found", error)
    });
}

/**
 * exporting function to utilize where it is imported
 */
module.exports = databaseConnection;