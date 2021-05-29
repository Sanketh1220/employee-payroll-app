// const {getLogger} = require('nodemailer/lib/shared');
const EmployeeInfoService = require('../services/employeeInfoService');

class EmployeeInfoController {

    create = (req, res) => {
        const employeeData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }

        const employeeResponse = {
        }

        EmployeeInfoService.create(employeeData, (error, data) => {
            if (error) {
                // logger.error("Some error occurred while creating employee info")
                return res.status(500).send({
                    success: employeeResponse.success = false,
                    message: employeeResponse.message = "Some error occurred while creating employee info"
                })
            }

            // logger.info("Employee info successfully added!")
            res.send({
                success: employeeResponse.success = true,
                message: employeeResponse.message = "Employee info added!",
                data: employeeResponse.data = data
            })
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
//             message: error.message || "Some error occured while creating the employee info"
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
//             throw new Error("Unable to update employee info, error occured");
//         }

//         res.send(updateEmployeeInfo);
//     } catch (error) {
//         res.status(500) ({
//             message: error.message || "Some error occured while updating employee info"
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
//             message: error.message || "Some error occured while deleting employee info"
//         });
//     }
// }