//importing a class from models and assigned to constant variable
const employeeInfoModel = require('../models/employeePayroll');

const helperClass = require('../middleware/helper');

//requiring dotenv package so as to get access of env file
require('dotenv').config();

//requiring jsonwebtoken package and assigned to variable
const jwt = require('jsonwebtoken');

//requiring package bcrypt
const bcrypt = require('bcrypt');

//class created to write functions
class EmployeeInfoService {
    /**
     * @description function created to create employee info into database
     * @param {*} A valid employeeData is expected 
     * @param {*} callBack 
     */
    createEmployeeInfo(employeeData, callBack) {
        employeeInfoModel.createInfo(employeeData, (error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data));
        });
    }

    /**
     * @description function created to retrieve data from database
     * @param {*} callBack 
     */
    getAllEmployeeInfo(callBack) {
        employeeInfoModel.findAll((error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data));
        });
    }

    /**
     * @description function created to update info of employee into database
     * @param {*} A valid employeeData is expected
     * @param {*} callBack 
     */
    updateEmployeeInfo(employeeId, employeeData, callBack) {
        employeeInfoModel.updateInfo(employeeId, employeeData, (error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data));
        });
    }

    /**
     * @description function created to delete info of employee using id into database
     * @param {*} A valid employeeInfoData is expected
     * @param {*} callBack 
     */
    deleteEmployeeInfo(employeeInfoData, callBack) {
        employeeInfoModel.deleteById(employeeInfoData, (error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data)); 
        });
    }

    /**
     * @description function handles to get single employee data
     * @param {*} employeeInfo 
     * @param {*} callBack 
     */
    getEmployeeInfo(employeeInfo, callBack) {
        employeeInfoModel.getDataById(employeeInfo, (error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data));
        });
    }

    /**
     * @description function handles login of employee
     * @param {*} employeeData 
     * @param {*} callBack 
     */
    loginEmployee(employeeData, callBack) {
        const token = helperClass.generateAccessToken({employeeData});

        employeeInfoModel.loginEmployee(employeeData, (error, data) => {
            if (error) {
                callBack(error, null);
            }
            else if (helperClass.bcryptDataCheck(employeeData.password, data.password)){
                return callBack("Please enter correct password", null);
            }
            return callBack(null, token);
        });
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new EmployeeInfoService();