const express = require('express');
const app = express.Router();

const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");


// Get cities

/**
 * @swagger
 * /cities:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: OK
 */

app.get('/', (req, res) => {
    let sql = `SELECT * FROM city`;
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


// Get one city

/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:id', (req, res) => {
    let sql = `SELECT * FROM city WHERE ID =${req.params.id};`;
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