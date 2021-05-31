/**
 * imported a class from controller 
 * declared a constant variable and assigned to use functions of that imported class
 */
const employeeController = require('../controllers/employeePayroll.js')

/**
 * exporting whole as app 
 * routes created 
 * @param {*} app 
 */
module.exports = (app) => {

     //create new info
     app.post('/employeePayroll', employeeController.createApi);

     // retrieve all employeeInfo
     app.get('/employeePayroll', employeeController.getAllDataApi);

     // retrieve one employee info using ID
     // app.get('/employeePayroll/:employeeInfoId', employeeController.getData);

     // updating a employeeInfo using ID
     app.put('/employeePayroll/:employeeInfoId', employeeController.updateApi);

     // delete a employee info using ID
     app.delete('/employeePayroll/:employeeInfoId', employeeController.deleteByIdApi);
}