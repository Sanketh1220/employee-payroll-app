/**
 * requiring 'dotenv' package
 */
require('dotenv').config();

/**
 * constant variable created to require mongoose package and assigned to variable
 */
const mongoose = require("mongoose");

function databaseConnection() {
    /**
     * included to remove DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
     * without the `useFindAndModify` option set to false are deprecated.
     */
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);

    /**
     * connecting to mongoose using URL imported from env file
     */
    mongoose.connect(env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

    return mongoose.connection
    .once('open', () => console.log('Mongo database Connected'))
    .on('error', (error)=> {
        console.log("Error found",error)
        
    });
}

/**
 * exporting function to utilize where it is imported
 */
module.exports = databaseConnection;