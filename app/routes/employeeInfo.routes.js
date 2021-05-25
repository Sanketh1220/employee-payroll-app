module.exports = (app) => {
    const employeeInfo = require('../controllers/employeeInfo.controller.js');

    //create new info
    app.post('/employeeInfo', employeeInfo.create);

    // retrieve all employeeInfo
    app.get('/employeeInfo', employeeInfo.findAll);

    // retrieve one employee info using ID
    app.get('/employeeInfo/:employeeInfoId', employeeInfo.findOne);

    // updating a note using ID
    app.put('/employeeInfo/:employeeInfoId', employeeInfo.update);

    // delete a employeeinfo using ID
    app.delete('/employeeInfo/:employeeInfoId', employeeInfo.delete)
}