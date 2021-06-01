/**
 * declared a constant variable to assign a imported class from services
 */
const employeeInfoService = require('../services/employeePayroll');

/**
 * created class to write functions 
 */
class EmployeeInfoController {

    /**
     * function written to create data into database
     * @param {*} A valid req is expected
     * @param {*} res
     */
    createApi(req, res) {
        /**
         * object created using requested data from user 
         */
        const employeeData = {
            firstName: req.params.firstName,
            lastName: req.params.lastName,
            email: req.params.email,
            password: req.params.password
        }

        /**
         * empty object created
         */
        // const response = {}

        /**
         * calling function from service class
         */
        employeeInfoService.createEmployeeInfo(employeeData, (error, data) => {
            /**
             * used ternary instead of if-else to send response according to result
             */
            return ((error) ?
                res.status(500).send({
                    success: false,
                    message: "Some error occurred while creating employee info"
                }) :

                res.send({
                    success: true,
                    message: "Employee info added!",
                    data: data
                }));
        });
    }

    /**
     * function written to update data into database
     * @param {*} A valid req is expected
     * @param {*} res
     */
    updateApi(req, res) {
        /**
         * object created using requested data from user 
         */
        const employeeData = {
            firstName: req.firstName,
            lastName: req.lastName,
            email: req.email,
            password: req.password
        }

        /**
         * empty object created
         */
        // const response = {}

        /**
         * calling function from service class
         */
        employeeInfoService.updateEmployeeInfo(employeeData, (error, data) => {
            /**
             * used ternary instead of if-else to send response according to result
             */
            return ((error) ?
                res.status(500).send({
                    success: false,
                    message: "Some error occurred while updating employee info"
                }) :

                res.send({
                    success: true,
                    message: "Employee info updated!",
                    data: data
                }));
        })
    }

    /**
     * function written to retrieve data from database
     * @param {*} A valid request is expected
     * @param {*} A valid response is expected
     */
    getAllDataApi(req, res) {
        /**
         * empty object created
         */
        const response = {}

        /**
         * calling function from service class
         */
        employeeInfoService.getAllEmployeeInfo((error, data) => {
            /**
             * used ternary instead of if-else to send response according to result
             */
            return ((error) ?
                res.status(500).send({
                    success: false,
                    message: "Some error occurred while retrieving employee info"
                }) :
                res.send({
                    success: true,
                    message: "Employee info successfully retrieved!",
                    data: data
                }));
        });
    }

    /**
     * function written to delete data from database
     * @param {*} A valid request is expected 
     * @param {*} res 
     */
    deleteByIdApi(req, res) {
        /**
         * object created using requested data from user 
         */
        const employeeData = {
            employeeId: req.id
        }

        /**
         * empty object created
         */
        const response = {}

        /**
         * used ternary instead of if-else to send response according to result
         */
        employeeInfoService.deleteEmployeeInfo(employeeData, (error, data) => {
            console.log(error);
            return ((error) ?
                res.status(500).send({
                    success: false,
                    message: "Some error occurred while deleting employee info",

                }) :
                res.send({
                    success: true,
                    message: "Employee info Deleted!",
                    data: data
                }));
        })
    }
}

/**
 * exporting th whole class to utilize or call function created in this class
 */
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