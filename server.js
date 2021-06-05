require('dotenv').config();
const express = require('express');
const databaseConnection = require('./config/dbConfig');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();
const logger = require('./config/logger');

databaseConnection();

// parsing the requests of content
app.use(express.urlencoded({
    extended: true
}));

//parsing requests of content type - json
app.use(express.json());

//defining a simple root statement
app.get('/', (req, res) => {
    res.send("<h1>Hey! Welcome to employee payroll app.</h1>");
});

// //imported file from routes folder to use its functions here
// require('./app/routes/employeePayroll.js')(app);

// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'Employee Payroll API',
//             version: '1.0.0'
//         }
//     },
//     apis: ['server.js'],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log(swaggerDocs);
// app.use('/heyda', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// /**
//  * @swagger
//  * /heyda:
//  *      get:
//  *          description: Get info
//  *          responses: 
//  *              200:
//  *                  description: Success
//  */
// app.get('/heyda', (req, res) => {
//     res.send({
//         firstName: 'Sanketh',
//         lasName: 'Chigurupalli',
//         email: 'sanketh.chigurupalli@gmail.com',
//         password: 'nonefor&ad34'
//     })
// })

//declaring a port number for server to run
 app.listen(PORT, () => {
    logger.log("info", "Server is up and running");
});

module.exports = app;