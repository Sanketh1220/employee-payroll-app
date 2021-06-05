const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
require('superagent');
const request = require('supertest');
// const { request } = require('../server');
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
            let employeeData = userInputs.employeeLogPos
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
                })
        })

        it('it should not make POST for login employee', (done) => {
            let employeeData = userInputs.employeeLogNeg
            chai.request(server)
                .post('/employeePayroll/login')
                .send(employeeData)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("This user doesn't exist! Please register.");
                    done();
                })
        })
    })

    /**
     * /POST request test
     * Positive and Negative - Registration Test 
     */
    describe('POST employee /registration', () => {
        it('it should make POST for registration', (done) => {
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
                })
        })

        it('it should make not POST for registration', (done) => {
            let employeeData = userInputs.employeeRegNeg
            chai.request(server)
                .post('/employeePayroll/registration')
                .send(employeeData)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                    done();
                })
        })
    })

    var authenticatedUser = request.agent(server);

    before(function(done){
        authenticatedUser
            .post('/employeePayroll/login')
            .send(userInputs.employeeLogPos)
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect('Location' ,'/');
                done();
            });
    });

    describe('GET /', function(done) {
        //if the user is logged in we should get a 200 status code
        it('Should return a 200 response if the user is logged in',
        function(done){
            authenticatedUser.get('/employeePayroll/login')
            .expect(200, done);
        });

        //if the user is not logged in we should get a 302 response code and be directed to the / page
        it('Should return 302 response and redirect to /',
        function(done){
            request(app).get('/employeePayroll/login')
            .expect('Location', '/')
            .expect(302, done);
        })
    });


// describe('Employee Payroll API', () => {
// });