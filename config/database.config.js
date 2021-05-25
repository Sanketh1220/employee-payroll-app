// module.exports = {
//     url: 'mongodb://localhost:27017/easy-notes',
// }

const mongoose = require("mongoose");

module.exports = () => {
    
    const url = 'mongodb://localhost:27017/employeeInfo';


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