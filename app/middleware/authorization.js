/**
 * requiring the jsonwebtokens package
 */
const jwt = require('jsonwebtoken');

/**
 * getting access for env file for providing secret_token
 */
require('dotenv').config();

module.exports = {

    /**
     * @description takes in the token from user and authorizes the user only when token
     * is correct and moves user to next() which is an access to perform CRUD
     * 400 - Bad request, 401 - Unauthorized user
     * @param {*} A valid req is expected
     * @param {*} res 
     * @param {*} next is a method 
     * @returns 
     */
    tokenChecker: (req, res, next) => {
        let token = req.get("token");
        if (token) {
            jwt.verify(token, SECRET_TOKEN, error => {
                if (error) {
                    console.log(error);
                    return res.status(400).send({
                        success: false,
                        message: "Token is Invalid!"
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: "Unauthorized User, Provide token to get authorized!"
            });
        }
    }
};