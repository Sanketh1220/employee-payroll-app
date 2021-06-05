// const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
// const employeeModel = require('../app/models/employeePayroll');

//assertion style
const should = chai.should();

chai.use(chaiHttp);

describe('Employee Payroll API', () => {

    /**
     * Test the GET all employee data API
     */
    describe('/GET /employeePayroll', () => {
        it('It should GET all employee info', (done) => {
            chai.request(server)
                .get('/employeePayroll')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.length.should.be.eq(5);
                    done();
                });
        });
    });

    /**
     * Test the GET single employee data by ID API
     */
    describe('/GET /employeePayroll', () => {
        it('it should return employee info by ID', (done) => {
            const employeeInfoId = '60b6617cb2b1e55a6d074aa9';
            chai.request(server)
                .get('/employeePayroll/:' + employeeInfoId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('message').eql('Employee info successfully retrieved!');
                    res.body.length.should.be.eq(5);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST employee data', () => {
        it('it should POST a employee Data', (done) => {
            let employeeInfo = {
                firstName: "Umesh",
                lastName: "Yadav",
                email: "umesh.yadav231@gmail.com",
                password: "Umeshwar@12"
            }
            chai.request(server)
                .post('/employeePayroll')
                .send(employeeInfo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property('message').eql('Employee info added!');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');                    
                    done();
                });
        });
    });

    describe('/POST employee login', () => {
        it('it should make POST for login employee', (done) => {
            let employeeData = {
                email: "himanshu.uggar4506@gmail.com",
                password: "himanshuK@34"
            }
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
    })

    describe('/POST employee login', () => {
        it('it should make POST for registration', (done) => {
            let employeeData = {
                firstName: "Rushikesh", 
                lastName: "Tayade", 
                email: "rushikesh.tayade@gmail.com", 
                password: "Rushi@123"
            }
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
    })
});