 /**
 * importing a class from models and assigned to constant variable
 */
const employeeInfoModel = require('../models/employeePayroll');

/**
 * class created to write functions
 */
class EmployeeInfoService {
    /**
     * @description function created to create employee info into database
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
     * @description function created to retrieve data from database
     * @param {*} callBack 
     */
    getAllEmployeeInfo(callBack) {
        employeeInfoModel.findAll((error, data) => {
            return ((error) ?
                callBack(error.null) :
                callBack(null, data));
        })
    }

    /**
     * @description function created to update info of employee into database
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
     * @description function created to delete info of employee using id into database
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

    /**
     * @description function handles to get single employee data
     * @param {*} employeeInfo 
     * @param {*} callBack 
     */
    getEmployeeInfo(employeeInfo, callBack) {
        employeeInfoModel.getDataById(employeeInfo, (error, data) => {
            return ((error) ?
                callBack(error.null) :
                callBack(null, data));
        })
    }

    /**
     * @description function handles login of employee
     * @param {*} employeeData 
     * @param {*} callBack 
     */
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