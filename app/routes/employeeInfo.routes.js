const EmployeeController = require('../controllers/employeeInfo.controller.js')

module.exports = (app) => {
    // const EmployeeController = require('../controllers/employeeInfo.controller.js');

     //create new info
     app.post('/employeeInfo/employee', EmployeeController.apiCreateEmployeeInfo);

     // retrieve all employeeInfo
     app.get('/employeeInfo/employee', EmployeeController.apiGetAllEmployeeInfo);
 
     // retrieve one employee info using ID
     app.get('/employeeInfo/employee/:employeeInfoId', EmployeeController.apiGetAllEmployeeInfoById);
 
     // updating a employeeInfo using ID
     app.put('/employeeInfo/employee/info/update/:employeeInfoId', EmployeeController.apiUpdateEmployeeInfo);
 
     // delete a employee info using ID
     app.delete('/employeeInfo/employee/:employeeInfoId', EmployeeController.apiDeleteEmployeeInfo);
}
    // //create new info
    // app.post('/employeeInfo/employee', employeeInfo.create);

    // // retrieve all employeeInfo
    // app.get('/employeeInfo/employee', employeeInfo.findAll);

    // // retrieve one employee info using ID
    // app.get('/employeeInfo/:employeeInfoId', employeeInfo.findOne);

    // // updating a employeeInfo using ID
    // app.put('/employeeInfo/employee/info/update/:employeeInfoId', employeeInfo.update);

    // // delete a employee info using ID
    // app.delete('/employeeInfo/employee/:employeeInfoId', employeeInfo.delete)
//}