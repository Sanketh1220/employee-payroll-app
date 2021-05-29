const employeeController = require('../controllers/employeeInfoController.js')

module.exports = (app) => {

     //create new info
     app.post('/employeePayroll', employeeController.createApi);

     // app.post('/user/all', function(req, res){
     //      employeeController.createApi
     //    });

//      // retrieve all employeeInfo
//      app.get('/employeePayroll', employeeController.getAllDataApi);
 
//      // retrieve one employee info using ID
//      app.get('/employeePayroll/:employeeInfoId', employeeController.apiGetAllEmployeeInfoById);
 
//      // updating a employeeInfo using ID
//     app.put('/employeePayroll/:employeeInfoId', employeeController.apiUpdateEmployeeInfo);
 
//      // delete a employee info using ID
//      app.delete('/employeePayroll/:employeeInfoId', employeeController.apiDeleteEmployeeInfo);
}