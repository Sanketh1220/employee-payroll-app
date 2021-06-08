require('dotenv').config();
const express = require('express');
const databaseConnection = require('./config/dbConfig');
const swaggerUI = require('swagger-ui-express');
const app = express();
const logger = require('./config/logger');
const swagger = require('./app/swagger/employeePayroll');
const swaggerJSDoc = require('swagger-jsdoc');

databaseConnection();

// parsing the requests of content
app.use(express.urlencoded({
    extended: true
}));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Employee Payroll API',
            version: '1.0.0',
            description: 'Employee payroll management app'
        },
    },
    apis: ['server.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//parsing requests of content type - json
app.use(express.json());
/**
 * @swagger
 * definitions:
 *  EmployeeInfo:
 *      type:object
 *      properties:
 *          firstName:
 *              type:string
 *              description: first name of employee
 *              example: 'Sanketh'
 *          lastName:
 *              type:string
 *              description: last name of employee
 *              example: 'Chigurupalli'
 *          email:
 *              type:string
 *              description: email of employee
 *              example: 'sanketh.chigurupalli@gmail.com'
 *          password:
 *              type:string
 *              description: password of employee
 *              example: 'Chigurupalli@234'
 */

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