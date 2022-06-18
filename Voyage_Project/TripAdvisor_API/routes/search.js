const fetch = require('node-fetch');
const express = require('express');
const app = express.Router();

  app.get("/:searchQuery", async (req, res) => {
    console.log("/search endpoint called");

const API_KEY = 'EF79081E00514358A15247B980F445E0';

const searchQuery = req.params.searchQuery;
const url =`https://api.content.tripadvisor.com/api/v1/location/search?language=en&key=${API_KEY}&searchQuery=${searchQuery}`
const options = {method: 'GET', headers: {Accept: 'application/json', All:'*'}, params: {value: searchQuery}};

const response = await fetch(url, options)
.then(res => res.json())
.catch(e => {
  console.error ({
    "message": "sorry not good",
    error: e
  });
});
console.log(response);
res.header('Access-Control-Allow-Origin', '*')
res.json(response);
});




module.exports = app;