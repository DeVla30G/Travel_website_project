const express = require('express');
const app = express.Router();

const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");


// Get countrylanguage

/**
 * @swagger
 * /lang:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Countrylanguage
 *     responses:
 *       200:
 *         description: OK
 */

app.get('/', (req, res) => {
    let sql = `SELECT * FROM countrylanguage`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let countrylanguage = result.map(countrylanguage => {
                return countrylanguage;
            })
            return res.status(200).send(countrylanguage);
        }
    });
    return ;
})


// Get one countrylanguage

/**
 * @swagger
 * /lang/{id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Countrylanguage
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:CountryCode', (req, res) => {
    let sql = `SELECT * FROM countrylanguage WHERE CountryCode ="${req.params.CountryCode}";`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let countrylanguage = result.map(countrylanguage => {
                return countrylanguage;
            })
            return res.status(200).send(countrylanguage);
        }
    });
    return ;
})

module.exports = app;