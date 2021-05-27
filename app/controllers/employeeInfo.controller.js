const EmployeeInfoService = require('../services/employeeInfo.service.js');

module.exports = class EmployeeInfo {

    static async apiCreateEmployeeInfo(req, res) {
        try {
            const createEmployeeInfo = await EmployeeInfoService.createEmployeeInfo(req.body);
            res.send(createEmployeeInfo);
        } catch (error) {
            res.status(500) ({
                message: error.message || "Some error occured while creating the employee info"
            });
        }
    }

    static async apiGetAllEmployeeInfo(req, res) {
        try {
            const employeeInfo = await EmployeeInfoService.getAllEmployeeInfo();
            if(!employeeInfo){
                res.status(404).send({
                    message: "Employee info content cannot be empty"
                });
            }
        } catch (error) {
            res.status(500) ({
                message: error.message || "Some error occured while getting the employee info"
            });
        }
    }

    static async apiGetAllEmployeeInfoById(req, res){
        try {
            let id = req.params._id || {};
            const employeeInfo = await EmployeeInfoService.getEmployeeInfoById(id);
            res.send(employeeInfo);
        } catch (error) {
            res.status(500) ({
                message: error.message || "Some error occured while getting single employee info"
            });
        }
    }

    static async apiUpdateEmployeeInfo(req, res) {
        try {
            const employee = {}
            employee.firstName = req.body.firstName;
            employee.lastName = req.body.lastName;
            employee.email = req.body.email;
            employee.password = req.body.password;

            const updateEmployeeInfo = await EmployeeInfoService.updateEmployeeInfo(employee);

            if(updateEmployeeInfo.ModifiedCount === 0) {
                throw new Error("Unable to update employee info, error occured");
            }

            res.send(updateEmployeeInfo);
        } catch (error) {
            res.status(500) ({
                message: error.message || "Some error occured while updating employee info"
            });
        }
    }

    static async apiDeleteEmployeeInfo(req, res) {
        try {
            const employeeId = req.params._id;
            const deleteEmployeeInfo = await EmployeeInfoService.deleteEmployeeInfo(employeeId);
            res.send({message: "Employee info deleted successfully!" + employeeId});
        } catch (error) {
            res.status(500) ({
                message: error.message || "Some error occured while deleting employee info"
            });
        }
    }
}

// const EmployeeInfo = require('../models/employeeInfo.model.js');

// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Employee Info content can not be empty"
//         });
//     }

//     // Create a employee info
//     const employeeInfo = new EmployeeInfo({
//         firstName: req.body.firstName || "Untitled First Name",
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password
//     });

//     // save employee info in database
//     employeeInfo.save()
//         .then(data => {
//             res.send(data);
//         }).catch(error => {
//             res.status(500).send({
//                 message: error.message || "Some error occured while creating the employee info"
//             });
//         });
// };

// // Retrieve and return all employee's info from the database.
// exports.findAll = (req, res) => {
//     EmployeeInfo.find()
//     .then(employeeInfo => {
//         res.send(employeeInfo);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving info of employee."
//         });
//     });
// }

// // Find a single employee info with a employeeId
// exports.findOne = (req, res) => {
//     EmployeeInfo.findById(req.params.employeeInfoId)
//     .then(employeeInfo => {
//         if(!employeeInfo) {
//             return res.status(404).send({
//                 message: "Info not found with id " + req.params.employeeInfoId
//             });            
//         }
//         res.send(employeeInfo);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Info not found with id " + req.params.employeeInfoId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving note with id " + req.params.employeeInfoId
//         });
//     });
// };

// // Update employee info identified by the employeeInfoId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if(!req.body) {
//         return res.status(400).send({
//             message: "Employee Info content can not be empty"
//         });
//     }

//     // Find employee info using ID and update it with the request body
//     EmployeeInfo.findByIdAndUpdate(req.params.employeeInfoId, {
//         // firstName: {
//         //     type: String,
//         //     required: true,
//         //     validate: /^[a-zA-Z ]{2,30}$/
//         // },
//         // lastName: {
//         //     type: String,
//         //     required: true,
//         //     validate: /^[a-zA-Z]{2,30}$/
//         // },
//         // email: {
//         //     type: String,
//         //     required: true,
//         //     validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
//         // },
//         // password: {
//         //     type: String,
//         //     required: true
//         // },
//         firstName: req.body.firstName || "Untitled First Name",
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password
//     }, {new: true})
//     .then(employeeInfo => {
//         if(!employeeInfo) {
//             return res.status(404).send({
//                 message: "Employee info not found with id " + req.params.employeeInfoId
//             });
//         }
//         res.send(employeeInfo);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Employee info not found with id " + req.params.employeeInfoId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating employee info with id " + req.params.employeeInfoId
//         });
//     });
// };

// // Delete a employee info with the specified employeeInfoId in the request
// exports.delete = (req, res) => {
//     EmployeeInfo.findByIdAndRemove(req.params.employeeInfoId)
//     .then(employeeInfo => {
//         if(!employeeInfo) {
//             return res.status(404).send({
//                 message: "Employee info not found with id " + req.params.employeeInfoId
//             });
//         }
//         res.send({message: "Employee info deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Employee info not found with id " + req.params.employeeInfoId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete employee info with id " + req.params.employeeInfoId
//         });
//     });
// };
