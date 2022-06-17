var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');
let chaiHttp = require('chai-http');
let server = require('./login');
let chai = require('chai');


//Assertion style
chai.should();
chai.use(chaiHttp);

describe('Test trip route', function(done){
    it('should be able to sum 2 and 2 if ok', function(){
        chai.request(server)
        .get('/trip')
        .expect(2+2).to.equal(4);
        end((err, resp) => {
            resp.should.have.status(200);
        done();
    })
  })
})