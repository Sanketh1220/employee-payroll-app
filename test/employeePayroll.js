const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const employeeModel = require('../app/models/employeePayroll');

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
                    res.body.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.length.should.be.eq(5);
                    done();
                });
        });
    });

    /**
     * Test the GET single employee data by ID API
     */
    describe('/GET employee', () => {
        it('it should return employee info by ID', (done) => {
            const employeeInfoId = '60b6617cb2b1e55a6d074aa9';
            chai.request(server)
                .get('/employeePayroll/:' + employeeInfoId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.length.should.be.eq(5);
                    done();
                });
        });
    });

    /*
  * Test the /POST route
  */
  describe('/POST book', () => {
    it('it should not POST a book without pages field', (done) => {
        let employeeInfo = {
            firstName: "Umesh",
            lastName: "Yadav",
            email: "umesh.yadav231@gmail.com",
            password: "Umeshwar@12"
        }
      chai.request(server)
          .post('/book')
          .send(book)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('pages');
                res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});
});