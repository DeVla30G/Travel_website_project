let expect = require('chai').expect;
let app = require('../app');
let request = require('supertest');
let chaiHttp = require('chai-http');
let server = require('./users');
let chai = require('chai');
let mysql = require('mysql');

//Assertion style
chai.should();
chai.use(chaiHttp);

describe('Access to voyage Database', function () {
    describe('Fail', function(){
        it('should return error with wrong credentials', function(done){
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'Wrong user',
                password: '1234',
                database: 'voyage'

            });
            connection.connect(done);
        });
    })
});