const express = require('express');
const app = express.Router();
const cors = require("cors");
const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");


// Get countries inner join cities

/**
 * @swagger
 * /CountryCity:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - CountryCity
 *     responses:
 *       200:
 *         description: OK
 */

app.get('/', (req, res) => {
    let sql = `select * from country inner join city on CountryCode = Code ORDER BY city.Name ASC;`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let countries = result.map(countries => {
                return countries;
            })
            return res.status(200).send(countries);
        }
    });
    return ;
})


module.exports = app;