/**
 * requiring dotenv package so as to get access of env file
 */
require('dotenv').config();

/**
 * requiring package bcrypt
 */
 const bcrypt = require('bcrypt');

/**
 * requiring jsonwebtoken package and assigned to variable
 */
const jwt = require('jsonwebtoken');

/**
 * Creating a class so as to avail all functions return in it
 */
class HelperClass {

    /**
     * @description function is return to generate a token when there is a valid user
     * @param {*} A valid employeeData is expected
     * @returns 
     */
    generateAccessToken(employeeData) {
        return jwt.sign(employeeData, SECRET_TOKEN, {
            expiresIn: '1800s'
        });
    }

    /**
     * @description function compares the password requested by user with 
     * one in data using bcrypt as password in database will be encrypted
     * @param {*} userData 
     * @param {*} dbData 
     * @returns 
     */
    bcryptDataCheck(userData, dbData) {
        return (userData && dbData) ? (!bcrypt.compareSync(userData, dbData)): false;
    }

}

/**
 * exporting the class to utilize or call function created in this class
 */
 module.exports = new HelperClass(); 