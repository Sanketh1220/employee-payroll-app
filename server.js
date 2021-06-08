require('dotenv').config();
const express = require('express');
const databaseConnection = require('./config/dbConfig');
const swaggerUI = require('swagger-ui-express');
const app = express();
const logger = require('./config/logger');
const swagger = require('./app/swagger/swagger.json');
const swaggerJSDoc = require('swagger-jsdoc');

databaseConnection();

// parsing the requests of content
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))

//imported file from routes folder to use its functions here
require('./app/routes/employeePayroll.js')(app);

//defining a simple root statement
app.get('/', (req, res) => {
    res.send("<h1>Hey! Welcome to employee payroll app.</h1>");
});

//declaring a port number for server to run
 app.listen(PORT, () => {
    logger.log("info", "Server is up and running");
});

module.exports = app;