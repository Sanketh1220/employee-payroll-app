const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = require('../../server');

module.exports = swagger = () => {

    const swaggerOptions = {
        definition: {
            openapi :'3.0.0',
            info: {
                title: "Employee Payroll API",
                version: "1.0.0",
                description: "Management app for employee payroll API"
            },
        },
        apis: ["server.js"]
    }

    var options = {
        swaggerOptions: {
            authAction: {
                JWT: {
                    name: "JWT",
                    schema: {
                        type: "apiKey",
                        in: "header",
                        name: "Authorization",
                        description: ""
                    },
                    value: "Bearer <JWT>"
                }
            }
        }
    };

    const swaggerDocs = swaggerJSDoc(swaggerOptions);
    // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));

    /**
     * @swagger
     * definitions:
     *  Employee:
     *   type: object
     *   properties:
     *    firstName:
     *     type: string
     *     description: First Name of employee
     *     example: 'Sanketh'
     *    lastName:
     *     type: string
     *     description: Last Name of employee
     *     example: 'Chigurupalli'
     *    email:
     *     type: string
     *     description: email of employee
     *     example: 'sanketh.chigurupalli@gmail.com'
     *    password:
     *     type: string
     *     description: password of employee
     *     example: 'Chigurupalli@212'
     */

    /**
     * @swagger
     * /employeePayroll/registration
     *  post:
     *   summary: registers user or employee
     *   description: registering employee into the app
     *   requestBody:
     *    content:
     *     application/json:
     *      schema:
     *       $ref: '#definitions/Employee'
     *   responses:
     *    200:
     *     description: employee registered successfully
     *    500:
     *     description: Employee registration failed
     */
}