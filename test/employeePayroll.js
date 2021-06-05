const chai = require('chai');
const chaiHttp = require('chai-http');
const { use } = require('../server');
const server = require('../server');
const userInputs = require('./employeeData.json');

//assertion style
const should = chai.should();

chai.use(chaiHttp);

describe('Employee Payroll API', () => {

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
});