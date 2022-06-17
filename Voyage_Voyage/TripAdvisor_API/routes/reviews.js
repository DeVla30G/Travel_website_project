const fetch = require('node-fetch');
const express = require('express');
const app = express.Router();

const API_KEY = 'EF79081E00514358A15247B980F445E0';

  
  app.get("/", async (req, res) => {
    console.log("/reviews endpoint called");
const city = req.params.searchQuery;
const locationId = '2460293';
const url = 'https://api.content.tripadvisor.com/api/v1/location/2460293/reviews?language=en&key=EF79081E00514358A15247B980F445E0';
const options = {method: 'GET', headers: {Accept: 'application/json'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
  });
  
module.exports = app; 
