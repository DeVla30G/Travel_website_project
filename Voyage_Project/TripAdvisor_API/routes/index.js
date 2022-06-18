const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({code: 200, message: "Welcome to Api Tripadvisor"});
});

module.exports = router;