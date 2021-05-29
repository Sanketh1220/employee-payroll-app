require('dotenv').config();
const mongoose = require("mongoose");

function databaseConnection() {
    /**
     * included to remove DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
     * without the `useFindAndModify` option set to false are deprecated.
     */
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

    return mongoose.connection
    .once('open', () => console.log('Mongo database Connected'))
    .on('error', (error)=> {
        console.log("Eroor found",error)
    });
}

module.exports = databaseConnection;