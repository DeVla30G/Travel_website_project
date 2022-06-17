const fetch = require('node-fetch');
const express = require('express');
const app = express.Router();

const API_KEY = 'EF79081E00514358A15247B980F445E0';
const category = 'hotels'; 
// possible options are "hotels", "attractions", "restaurants", and "geos"
const lat_lon = '46.211414, 6.149714';
/* Latitude/Longitude pair to scope down the search around a 
specifc point - eg. "46.211414, 6.149714" */



  app.get("/nearby", async (req, res) => {
    console.log("/nearby endpoint called");

const url = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=46.211414,6.149714&category=${category}&language=en&key=${API_KEY}`;
const options = {method: 'GET', headers: {Accept: 'application/json'}};

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

// all attractions of a city  http://api.tripadvisor.com/api/partner/2.0/location_mapper/25.2048,55.2708?key=XXXXX-mapper&category=attractions