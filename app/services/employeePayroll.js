/**
 * importing a class from models and assigned to constant variable
 */
const employeeInfoModel = require('../models/employeePayroll');

/**
 * class created to write functions
 */
class EmployeeInfoService {

    /**
     * function created to create employee info into database
     * @param {*} A valid employeeData is expected 
     * @param {*} callBack 
     */
    createEmployeeInfo(employeeData, callBack) {
        console.log('services employee data' + employeeData);
        employeeInfoModel.createInfo(employeeData, (error, data) => {
            return ((error) ?
                callBack(error.null) :
                callBack(null, data));
        })
    }

    /**
     * function created to retrieve data from database
     * @param {*} callBack 
     */
    getAllEmployeeInfo(callBack) {
        /**
         * calling a function created in the models
         */
        employeeInfoModel.findAll((error, data) => {
            return ((error) ?
                callBack(error.null) :
                callBack(null, data));
        })
    }

    /**
     * function created to update info of employee into database
     * @param {*} A valid employeeData is expected
     * @param {*} callBack 
     */
    updateEmployeeInfo(employeeId, employeeData, callBack) {
        console.log('service update api', employeeData);
        employeeInfoModel.updateInfo(employeeId, employeeData, (error, data) => {
            return ((error) ?
                callBack(error.null) :
                callBack(null, data));
        })
    }

    /**
     * function created to delete info of employee using id into database
     * @param {*} A valid employeeInfoData is expected
     * @param {*} callBack 
     */
    deleteEmployeeInfo(employeeInfoData, callBack) {
        employeeInfoModel.deleteById(employeeInfoData, (error, data) => {
            return ((error) ?
                callBack(error.null) :
                callBack(null, data));
        })
    }

    getEmployeeInfo(employeeInfo, callBack) {
        employeeInfoModel.deleteById(employeeInfo, (error, data) => {
            return ((error) ?
                callBack(error.null) :
                callBack(null, data));
        })
    }

    loginEmployee(employeeData, callBack) {
        employeeInfoModel.loginEmployee(employeeData, (error, data) => {
            return ((error) ?
                callBack(error.null) :
                callBack(null, data));
        })
    }
}

/**
 * exporting the class to utilize or call function created in this class
 */
module.exports = new EmployeeInfoService();

// static async getAllEmployeeInfo() {
//     try {
//         const allEmployeeInfo = await EmployeeInfo.find();
//         // console.log(allEmployeeInfo);
//         return allEmployeeInfo;
//     } catch (error) {
//         console.log('Could not fetch employee info' + error);
//     }
// }

// static async createEmployeeInfo(data) {
//     try {
//         const newEmployee = {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.email,
//             password: data.password
//         }
//         const response = await new EmployeeInfo(newEmployee).save();
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }

// static async getEmployeeInfoById(employeeId) {
//     try {
//         const singleEmployeeInfo = await EmployeeInfo.findById({employeeInfoId: employeeId});
//         return singleEmployeeInfo;
//     } catch (error) {
//         console.log('Employee info not found.' + error);
//     }
// }

// static async updateEmployeeInfo(firstName, lastName, email, password) {
//     try {
//         const updateEmployeeInfo = await EmployeeInfo.updateOne(
//             {firstName, lastName, email, password});
//         return updateEmployeeInfo;
//     } catch (error) {
//         console.log('Failed to update employee info' + error)
//     }
// }

// static async deleteEmployeeInfo(employeeId) {
//     try {
//         const deletedEmployeeInfo = await EmployeeInfo.findOneAndDelete(employeeId);
//         return deletedEmployeeInfo;
//     } catch (error) {
//         console.log('Failed to delete employee info' + error);
//     }
// }