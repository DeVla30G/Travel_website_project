const express = require('express');
const app = express.Router();

const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");



// get all cities by country
/**
 * @swagger
 * /allcity/{CountryCode}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:CountryCode', (req, res) => {
    let sql = `SELECT * FROM city WHERE CountryCode ='${req.params.CountryCode}' LIMIT 10;`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let cities = result.map(cities => {
                return cities;
            })
            return res.status(200).send(cities);
        }
    });
    return ;
})


module.exports = app;