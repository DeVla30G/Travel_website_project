const express = require('express');
const app = express.Router();

const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");


// Get countries

/**
 * @swagger
 * /countries:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Countries
 *     responses:
 *       200:
 *         description: OK
 */

app.get('/', (req, res) => {
    let sql = `SELECT * FROM country`;
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


// Get one country

/**
 * @swagger
 * /countries/{id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Countries
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:Code', (req, res) => {
    let sql = `SELECT * FROM country WHERE Code ="${req.params.Code}";`;
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