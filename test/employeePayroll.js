const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
require('superagent');
const request = require('supertest');
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
    it('it should make POST for login employee', (done) => {
        const employeeData = userInputs.employeeLogPos
        chai.request(server)
            .post('/employeePayroll/login')
            .send(employeeData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Employee login successful!");
                res.body.should.have.property("token");
                done();
            });
    });

    it('it should not make POST for login employee', (done) => {
        const employeeData = userInputs.employeeLogNeg
        chai.request(server)
            .post('/employeePayroll/login')
            .send(employeeData)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

/**
 * /POST request test
 * Positive and Negative - Registration Test 
 */
describe('POST employee /registration', () => {
    it('it should be able make POST request for registration for new user', (done) => {
        let employeeData = userInputs.employeeRegPos
        chai.request(server)
            .post('/employeePayroll/registration')
            .send(employeeData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Employee info added!");
                res.body.should.have.property("data").should.be.a('object');
                done();
            });
    });

    it('it should fail to make POST request for registration of new user', (done) => {
        let employeeData = userInputs.employeeRegNeg
        chai.request(server)
            .post('/employeePayroll/registration')
            .send(employeeData)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
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
                done();
            });
    });

    /**
    * /GET request test
    * Positive and Negative - Get all employee data from database Test 
    */
    describe('GET /employeePayroll', () => {
        it('it should get all the employee data from database', (done) => {
            chai.request(server)
                .get('/employeePayroll')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info successfully retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    done();
                });
        });
    });

    /**
    * /GET request test
    * Positive and Negative - Get single employee data from database Test 
    */
    describe('GET /employeePayroll/:employeeId', () => {
        it('it should be able to get single employee info by ID from database', (done) => {
            chai.request(server)
                .get('/employeePayroll/60b7b79c274ad6211e49e79c')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info successfully retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    done();
                });
        });

        it('it should not get single employee info by ID from database', (done) => {
            chai.request(server)
                .get('/employeePayroll/' + userInputs.employeeGetSingleNeg.employeeId)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info successfully retrieved!");
                    done();
                });
        });

    });

    /**
    * /PUT request test
    * Positive and Negative - Update employee data into database for existing user Test 
    */
     describe('PUT /employeePayroll/:employeeId', () => {
        it('it should be able to get update or put employee info by using ID to database', (done) => {
            chai.request(server)
                .put('/employeePayroll/60bb93bfd719c8dfdbb43f0b')
                .send(userInputs.employeePutPos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info updated!");
                    res.body.should.have.property("data").should.be.a('object');
                    done();
                });
        });

        it('it should not get single employee info by ID from database', (done) => {
            chai.request(server)
                .put('/employeePayroll/60bb93bfd719c8dfdbb43f0b')
                .send(userInputs.employeePutNeg)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                    done();
                });
        });
    });

    /**
    * /DELETE request test
    * Positive and Negative - Deleting employee data from database by using their ID
    */
     describe('DELETE /employeePayroll/:employeeId', () => {
        it('it should be able to delete employee info by using ID to database', (done) => {
            chai.request(server)
                .delete('/employeePayroll/60bb93fc010f66e020eecb84')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info Deleted!");
                    res.body.should.have.property("data").should.be.a('object');
                    done();
                });
        });

        it('it should not be able to delete employee info by using ID to database', (done) => {
            chai.request(server)
                .delete('/employeePayroll/60bb93bfd719c8dfdbb430b')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee info Deleted!");
                    done();
                });
        });
    });
});