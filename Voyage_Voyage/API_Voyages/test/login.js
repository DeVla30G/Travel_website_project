var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');
let chaiHttp = require('chai-http');
let server = require('./login');
let chai = require('chai');


//Assertion style
chai.should();
chai.use(chaiHttp);
/*
const userCredentials = {
    email: 'sponge@bob.com', 
    password: 'garyTheSnail'
  }

  var authenticatedUser = request.agent(app);
before(function(done){
  authenticatedUser
    .post('/login')
    .send(userCredentials)
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      expect('Location', '/home');
      done();
    });
});

}) */

describe('Login API_Voyages', function(){

    it('Should succeed if credentials are valid', function(done){
        request(app)
        .post('/')
        .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ "email": "toto@coco.io", "password": "12345678" })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    })

    it('Should succeed if credentials are valid', function(done){
      request(app)
      .post('/')
      .set('Accept', 'application/json')
         .set('Content-Type', 'application/json')
         .send({ "email": "totococo.io", "password": "123" })
        .end ((err, resp) => {
          resp.should.have.status(200);
        done();
        })
      
         })
  })
