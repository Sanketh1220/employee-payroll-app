const EmployeeController = require('../controllers/employeeInfoController.js')

module.exports = (app) => {

     //create new info
     app.post('/employeeInfo/employee', EmployeeController.create);

     // retrieve all employeeInfo
     app.get('/employeeInfo/employee', EmployeeController.apiGetAllEmployeeInfo);
 
     // retrieve one employee info using ID
     app.get('/employeeInfo/employee/:employeeInfoId', EmployeeController.apiGetAllEmployeeInfoById);
 
     // updating a employeeInfo using ID
     app.put('/employeeInfo/employee/info/update/:employeeInfoId', EmployeeController.apiUpdateEmployeeInfo);
 
     // delete a employee info using ID
     app.delete('/employeeInfo/employee/:employeeInfoId', EmployeeController.apiDeleteEmployeeInfo);
}