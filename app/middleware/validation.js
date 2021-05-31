// const ValidatorError = require('@hapi/joi');
const joi = require('@hapi/joi');

const validateData = joi.object({
    firstName: joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    lastName: joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    email: joi.string().email().required().pattern(new RegExp()),
    password: joi.string().alphanum().min(8).message(28).pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)")).required()
});

module.exports = {validateData};