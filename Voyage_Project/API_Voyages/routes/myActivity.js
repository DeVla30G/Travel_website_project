const express = require('express');
const app = express.Router();

const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");

const verifyIdentity = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(400).send({ msg: "Please provide a token" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send({ msg: "This token is not valid." });

        req.user = user;
        next();
    });
}

// Get trips of a user

/**
 * @swagger
 * /myTrips:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - myTrips
 *     responses:
 *       200:
 *         description: OK
 */

app.get('/:user_id', (req, res) => {
   
    let sql = `SELECT * FROM activities where user_id=${req.params.user_id}`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let activity = result.map(activity => {
                return activity;
            })
            return res.status(200).send(activity);
        }
    });
    return ;
})



module.exports = app;