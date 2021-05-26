module.exports = (app) => {
    const employeeInfo = require('../controllers/employeeInfo.controller.js');

    //create new info
    app.post('/employeeInfo/employee', employeeInfo.create);

    // retrieve all employeeInfo
    app.get('/employeeInfo/employee', employeeInfo.findAll);

    // retrieve one employee info using ID
    app.get('/employeeInfo/:employeeInfoId', employeeInfo.findOne);

    // updating a employeeInfo using ID
    app.put('/employeeInfo/employee/info/update/:employeeInfoId', employeeInfo.update);

    // delete a employeeinfo using ID
    app.delete('/employeeInfo/employee/:employeeInfoId', employeeInfo.delete)
}