/**
 * imported a class from controller 
 * declared a constant variable and assigned to use functions of that imported class
 */
const employeeController = require('../controllers/employeePayroll.js')

const tokenCheck = require('../middleware/authorization');

/**
 * exporting whole as app 
 * routes created 
 * @param {*} app 
 */
module.exports = (app) => {

     //registration API post request
     app.post('/employeePayroll/registration' ,employeeController.registrationApi);

     //login API get request
     app.post('/employeePayroll/login', employeeController.loginApi);

     //retrieve all employeeInfo
     app.get('/employeePayroll', tokenCheck.tokenChecker, employeeController.getAllDataApi);

     //retrieve one employee info using ID
     app.get('/employeePayroll/:employeeInfoId', tokenCheck.tokenChecker ,employeeController.getDataByIdApi);

     //updating a employeeInfo using ID
     app.put('/employeePayroll/:employeeInfoId', tokenCheck.tokenChecker, employeeController.updateApi);

     //delete a employee info using ID
     app.delete('/employeePayroll/:employeeInfoId', tokenCheck.tokenChecker, employeeController.deleteByIdApi);
}