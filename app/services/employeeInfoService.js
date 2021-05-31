const EmployeeInfoModel = require('../models/employeeInfoModel');

class EmployeeInfoService {

    //correct
    createEmployeeInfo (employeeData, callBack) {
        EmployeeInfoModel.createInfo(employeeData, (error, data) => {
            if(error) {
                return callBack(error.null);
            }
            return callBack(null, data);
        })
    }

    //correct
    getAllEmployeeInfo (callBack) {
        EmployeeInfoModel.findAll((error, data) => {
            if(error){
                return callBack(error, null);
            }
            return callBack(null, data);
        })
    }

    //tentative
    updateEmployeeInfo(employeeData, callBack) {
        EmployeeInfoModel.updateInfo(employeeData, (error, data) => {
            if(error) {
                return callBack(error.null);
            }
            return callBack(null, data);
        })
    }

    //tentative
    deleteEmployeeInfo (employeeInfoData, callBack) {
        EmployeeInfoModel.deleteById(employeeInfoData ,(error, data) => {
            if(error){
                return callBack(error, null);
            }
            return callBack(null, data);
        })
    }
}

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