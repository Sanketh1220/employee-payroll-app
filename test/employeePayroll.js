const chai = require('chai');
const chaiHttp = require('chai-http');
require('superagent');
const server = require('../server');
const userInputs = require('./employeeData.json');

//assertion style
const should = chai.should();
chai.use(chaiHttp);


/**
 * /POST request test
 * Positive and Negative - Login Test 
 */
describe('POST employee /login', () => {
    it('Given valid email and password it should make POST request for login employee and generate token', (done) => {
        const employeeData = userInputs.employeeLogPos
        chai.request(server)
            .post('/employeePayroll/login')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Employee login successful!");
                res.body.should.have.property("token");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given valid email and invalid password it should not make POST request for login employee and fails to generate token', (done) => {
        const employeeData = userInputs.employeeLogNeg
        chai.request(server)
            .post('/employeePayroll/login')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(500);
                res.body.should.have.property("message").eql("Please enter correct password");
                if(error) {
                    return done(error);
                }
                done();
            });
    });
});

/**
 * /POST request test
 * Positive and Negative - Registration Test 
 */
describe('POST employee /registration', () => {
    it('Given valid first name, last name, email and password it should be able make POST request for registration and successfully register a new user', (done) => {
        let employeeData = userInputs.employeeRegPos
        chai.request(server)
            .post('/employeePayroll/registration')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Employee info added!");
                res.body.should.have.property("data").should.be.a('object');
                if(error) {
                    return done(err);
                }
                done();
            });
    });

    it('Given no first name and valid last name, email and password it should not be able make POST request for registration and throw message for user about first name is empty', (done) => {
        let employeeData = userInputs.employeeRegNeg
        chai.request(server)
            .post('/employeePayroll/registration')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given no last name and valid first name, email and password it should not be able make POST request for registration and throw message for user about last name is empty', (done) => {
        let employeeData = userInputs.employeeRegNegLastName
        chai.request(server)
            .post('/employeePayroll/registration')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given invalid email and valid first name, last name and password it should not be able make POST request for registration and throw message for user about email is invalid', (done) => {
        let employeeData = userInputs.employeeRegNegEmail
        chai.request(server)
            .post('/employeePayroll/registration')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('Given no password and valid first name, last name and email it should not be able make POST request for registration and throw message for user about password is empty', (done) => {
        let employeeData = userInputs.employeeRegNegPassword
        chai.request(server)
            .post('/employeePayroll/registration')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"password\" is not allowed to be empty");
                if(error) {
                    return done(error);
                }
                done();
            });
    });
});

describe('Employee Payroll API', () => {

    let token = '';

    beforeEach(done => {
        chai.request(server)
            .post('/employeePayroll/login')
            .send(userInputs.employeeLogPos)
            .end((error, res) => {
                token = res.body.token;
                res.should.have.status(200);
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    /**
    * /GET request test
    * Positive and Negative - Get all employee data from database Test 
    */
    describe('GET /employeePayroll', () => {
        it('Given a valid request it should get all the employee data from database', (done) => {
            chai.request(server)
                .get('/employeePayroll')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info successfully retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
    * /GET request test
    * Positive and Negative - Get single employee data from database Test 
    */
    describe('GET /employeePayroll/:employeeId', () => {
        it('Given a valid of token and ID it should be able to get single employee info by ID from database as per requested ID', (done) => {
            chai.request(server)
                .get('/employeePayroll/60b7b79c274ad6211e49e79c')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info successfully retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('Given a valid of token and ID it should not be able to get single employee info by ID from database as per requested ID', (done) => {
            chai.request(server)
                .get('/employeePayroll/' + userInputs.employeeGetSingleNeg.employeeId)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info successfully retrieved!");
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

    });

    /**
    * /PUT request test
    * Positive and Negative - Update employee data into database for existing user Test 
    */
     describe('PUT /employeePayroll/:employeeId', () => {
        it('Given all valid data it should be able to get update or PUT employee info successfully by using ID to database', (done) => {
            chai.request(server)
                .put('/employeePayroll/update/60bb93bfd719c8dfdbb43f0b')
                .send(userInputs.employeePutPos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info updated!");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('Given empty last name and all other valid data it not should be able to get update or PUT employee info and show message about last name is empty', (done) => {
            chai.request(server)
                .put('/employeePayroll/update/60bb93bfd719c8dfdbb43f0b')
                .send(userInputs.employeePutNeg)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('Given empty first name and all other valid data it not should be able to get update or PUT employee info and show message about first name is empty', (done) => {
            chai.request(server)
                .put('/employeePayroll/update/60bb93bfd719c8dfdbb43f0b')
                .send(userInputs.employeePutNegFirstName)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('Given invalid email and all other valid data it not should be able to get update or PUT employee info and show message about email is invalid', (done) => {
            chai.request(server)
                .put('/employeePayroll/update/60bb93bfd719c8dfdbb43f0b')
                .send(userInputs.employeePutNegEmail)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"email\" must be a valid email");
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('Given short password and all other valid data it not should be able to get update or PUT employee info and show message password is short by length', (done) => {
            chai.request(server)
                .put('/employeePayroll/update/60bb93bfd719c8dfdbb43f0b')
                .send(userInputs.employeePutNegPassword)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"password\" length must be at least 8 characters long");
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
    * /DELETE request test
    * Positive and Negative - Deleting employee data from database by using their ID
    */
     describe('DELETE /employeePayroll/:employeeId', () => {
        it('Given valid ID and token it should be able to delete employee info successfully by using ID to database', (done) => {
            chai.request(server)
                .delete('/employeePayroll/delete/60bb93fc010f66e020eecb84')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info Deleted!");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('Given invalid ID and valid token it should not be able to delete employee info from database', (done) => {
            chai.request(server)
                .delete('/employeePayroll/delete/60bb93bfd719c8dfdbb430b')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info Deleted!");
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    });
});