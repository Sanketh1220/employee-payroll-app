const express = require('express');
require('dotenv').config();

// required config file
// const dbConfig = require('./config/databaseConfig');
const dbConfig = require('./config/databaseConfig');

// creating express app
const app = express();

require('./app/routes/employeeInfoRoutes.js')(app);

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

// dbConfig().then(() => {
app.listen(3000, function () {
    console.log("Server is up and running")
});
