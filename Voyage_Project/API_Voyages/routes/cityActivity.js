
const express = require('express');
const app = express.Router();

const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");
// Get activities by city name

/**
 * @swagger
 * /activities/{city_name}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Activities
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:city_name', (req, res) => {
    let sql = `SELECT * FROM activities WHERE city_name ="${req.params.city_name}";`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let activities = result.map(activities => {
                return activities;
            })
            return res.status(200).send(activities);
        }
    });
    return ;
})

module.exports = app;