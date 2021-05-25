const express = require('express');


// required config file
const dbConfig = require('./config/database.config.js');

// creating express app
const app = express();

// parsing the requests of content
app.use(express.urlencoded({
    extended: true
}));

// parsing requests of content type - json
app.use(express.json());

// defining a simple root statement
app.get('/', (req, res) => {
    res.send("<h1>Hey! Welcome to employee payroll app.</h1>");
});

require('./app/routes/employeeInfo.routes.js')(app);

dbConfig().then(() => {
    app.listen(3000, function () {
        console.log("Server is up and running on port 3000")
    });
});