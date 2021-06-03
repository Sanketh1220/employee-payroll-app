/**
 * declared a constant variable to require express
 */
const express = require('express');

const databaseConnection = require('./config/dbConfig');

require('dotenv').config();

// creating express app
const app = express();

databaseConnection();

/**
 * parsing the requests of content
 */
app.use(express.urlencoded({
    extended: true
}));

/**
 * parsing requests of content type - json
 */
app.use(express.json());

/**
 * defining a simple root statement
 */
app.get('/', (req, res) => {
    res.send("<h1>Hey! Welcome to employee payroll app.</h1>");
});

app.get('/login', (req, res) => {
    res.send("<h1>Email</h1><h1>Password</h1>");
});

/**
 * imported file from routes folder
 * to use its functions here
 */
require('./app/routes/employeePayroll.js')(app);

/**
 * declaring a port number for server to run
 */
app.listen(PORT, () => {
    console.log("Server is up and running")
});
