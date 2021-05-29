const EmployeeInfoService = require('../services/employeeInfoService');

class EmployeeInfoController {

    createApi(req, res) {
        const employeeData = {
            firstName: req.firstName,
            lastName: req.lastName,
            email: req.email,
            password: req.password
        }

        const response = {}

        EmployeeInfoService.createEmployeeInfo(employeeData, (error, data) => {
            return ((error) ?
                res.status(500).send({
                    success: response.success = false,
                    message: response.message = "Some error occurred while creating employee info"
                }) :
                res.send({
                    success: response.success = true,
                    message: response.message = "Employee info added!",
                    data: response.data = data
                }));
        });
    }

    getAllDataApi(req, res) {
        const response = {}
        EmployeeInfoService.getAllEmployeeInfo(employeeData, (error, data) => {
            return ((error) ?
                res.status(500).send({
                    success: response.success = false,
                    message: response.message = "Some error occurred while creating employee info"
                }) :
                res.send({
                    success: response.success = true,
                    message: response.message = "Employee info added!",
                    data: response.data = data
                }));
        });
    }
}

module.exports = new EmployeeInfoController();



// static async apiCreateEmployeeInfo(req, res) {
//     try {
//         const createEmployeeInfo = await EmployeeInfoService.createEmployeeInfo(req.body);
//         res.send(createEmployeeInfo);
//     } catch (error) {
//         res.status(500) ({
//             message: error.message || "Some error occurred while creating the employee info"
//         });
//     }
// }

// static async apiGetAllEmployeeInfo(req, res) {
//     try {
//         const employeeInfo = await EmployeeInfoService.getAllEmployeeInfo();
//         if(!employeeInfo){
//             res.status(404).send({
//                 message: "Employee info content cannot be empty"
//             });
//         console.log(employeeInfo);
//         res.send(employeeInfo);
//         }
//     } catch (error) {
//         res.status(500) ({
//             message: error.message || "Some error occurred while getting the employee info"
//         });
//         // res.status(500).json({error: error});
//     }
// }

// static async apiGetAllEmployeeInfoById(req, res){
//     try {
//         let id = req.params.id || {};
//         const employeeInfo = await EmployeeInfoService.getEmployeeInfoById(id);
//         res.send(employeeInfo);
//     } catch (error) {
//         res.status(500) ({
//             message: error.message || "Some error occurred while getting single employee info"
//         });
//     }
// }

// static async apiUpdateEmployeeInfo(req, res) {
//     try {
//         const employee = {}
//         employee.firstName = req.body.firstName;
//         employee.lastName = req.body.lastName;
//         employee.email = req.body.email;
//         employee.password = req.body.password;

//         const updateEmployeeInfo = await EmployeeInfoService.updateEmployeeInfo(employee);

//         if(updateEmployeeInfo.ModifiedCount === 0) {
//             throw new Error("Unable to update employee info, error occurred");
//         }

//         res.send(updateEmployeeInfo);
//     } catch (error) {
//         res.status(500) ({
//             message: error.message || "Some error occurred while updating employee info"
//         });
//     }
// }

// static async apiDeleteEmployeeInfo(req, res) {
//     try {
//         const employeeId = req.params.id;
//         const deleteEmployeeInfo = await EmployeeInfoService.deleteEmployeeInfo(employeeId);
//         res.send({message: "Employee info deleted successfully!" + employeeId});
//     } catch (error) {
//         res.status(500) ({
//             message: error.message || "Some error occurred while deleting employee info"
//         });
//     }
// }

// logger.error("Some error occurred while creating employee info")(19)
//const EmployeeInfoService = require('../services/employeeInfoService');(1)
// logger.info("Employee info successfully added!")(25)