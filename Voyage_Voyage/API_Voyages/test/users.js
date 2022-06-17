let expect = require('chai').expect;
let app = require('../app');
let request = require('supertest');
let chaiHttp = require('chai-http');
let server = require('./users');
let chai = require('chai');

//Assertion style
chai.should();
chai.use(chaiHttp);

describe('Users API_Voyage', () => {
  

/** 
 * Test GET users route
*/
it('Should Get all the users', (done) => {
    chai.request(app)
    .get('/users')
    .end((err, resp) => {
        resp.should.have.status(200);
        resp.body.should.be.a('array');
   
    done();
    })
})

it('Should NOT Get all the users', (done) => {
    chai.request(app)
    .get('/user')
    .end((err, resp) => {
        resp.should.have.status(404);
    done();
    })
})

/** 
 * Test GET users route
*/

/** 
 * Test GET users route
*/
/** 
 * Test GET users route
*/
})