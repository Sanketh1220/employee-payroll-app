//declared a constant variable to assign a imported class from services
const employeeInfoService = require('../services/employeePayroll');

//declared a constant variable to assign a imported from middleware
const {validateData} = require('../middleware/validation');

//created class to write functions
class EmployeeInfoController {

    /**
     * @description function written to register employee
     * @param {*} A valid req is expected
     * @param {*} res
     */
    registrationApi(req, res) {
        console.log(req.body);
        console.log(req.body);
        var dataValidation = validateData.validate(req.body);
        if (dataValidation.error) {
            return res.status(400).send({
                message: dataValidation.error.details[0].message
            });
        }

        const employeeData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }

        employeeInfoService.createEmployeeInfo(employeeData, (error, data) => {
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while creating employee info" }) : res.send({success: true, message: "Employee info added!", data: data}));
        });
    }

    /**
     * @description function written to update data into database
     * @param {*} A valid req is expected
     * @param {*} res
     */
    updateApi(req, res) {
        var dataValidation = validateData.validate(req.body);
        if (dataValidation.error) {
            return res.status(400).send({
                message: dataValidation.error.details[0].message
            });
        }

        let employeeId = req.params;
        const employeeData = {
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }

        employeeInfoService.updateEmployeeInfo(employeeId, employeeData, (error, data) => {
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while updating employee info"}) : res.send({ success: true, message: "Employee info updated!", data: data}));
        });
    }

    /**
     * @description function written to retrieve data from database
     * @param {*} A valid request is expected
     * @param {*} A valid response is expected
     */
    getAllDataApi(req, res) {
        employeeInfoService.getAllEmployeeInfo((error, data) => {
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while retrieving employee info"}) : res.send({success: true, message: "Employee info successfully retrieved!", data: data}));
        });
    }

    /**
     * @description gets data of employee by ID
     * @param {*} req 
     * @param {*} res 
     */
    getDataByIdApi(req, res) {
        let employeeId = req.params;
        employeeInfoService.getEmployeeInfo(employeeId, (error, data) => {
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while retrieving employee info"}) : res.send({success: true, message: "Employee info successfully retrieved!", data: data}));
        });
    }

    /**
     * @description function written to delete data from database
     * @param {*} A valid request is expected 
     * @param {*} res 
     */
    deleteByIdApi(req, res) {
        let employeeData = req.params;

        console.log('Delete api test', employeeData);
        employeeInfoService.deleteEmployeeInfo(employeeData, (error, data) => {
            console.log(error);
            return ((error) ? res.status(500).send({success: false, message: "Some error occurred while deleting employee info"}) : res.send({success: true, message: "Employee info Deleted!", data: data}));
        });
    }

    /**
     * @description this function handles the login API
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    loginApi(req, res) {
        const employeeData = {
            email: req.body.email,
            password: req.body.password
        }

        employeeInfoService.loginEmployee(employeeData, (error, token) => {
            return ((error) ? res.status(500).send({message: error}) : res.send({success: true, message: "Employee login successful!", token: token}));
        });
    }
}

//exporting th whole class to utilize or call function created in this class
module.exports = new EmployeeInfoController();