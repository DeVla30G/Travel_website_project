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

// Get rates

/**
 * @swagger
 * /rating:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Ratings
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/', (req, res) => {
    let sql = `SELECT * FROM rating`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let rate = result.map(rate => {
                return rate;
            })
            return res.status(200).send(rate);
        }
    });
    return ;
})


// Get sum rates...

/**
 * @swagger
 * /rating/{activity_id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Ratings
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:id', (req, res) => {
    let sql = `SELECT ROUND(AVG(rate),1) as rate FROM rating WHERE activity_id =${req.params.id};`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let rate = result.map(rate => {
                return rate;
            })
            return res.status(200).send(rate);
        }
    });
    return ;
})


/**
 * @swagger
 * /rating:
 *   post:
 *      tags:
 *      - Ratings
 *      description: this post a rate
 *      security:
 *          - JWT token: []
 *      parameters:
 *          -in: path
 *          name: id
 *      responses:
 *       200:
 *         description: User profile with fields to update
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *
 */

app.post("/", (req, res) => {
    let body = req.body;
    if (body.rate) {
             
                    const user_id = req.body.user_id;
                    const activity_id = req.body.activity_id;
                    const rate = req.body.rate;
                    
                    con.query(`INSERT INTO rating (user_id, activity_id, rate, created_at) VALUES ("${user_id}", "${activity_id}", "${rate}", now())`, async (err, result, fields) => {
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                res.status(409).send({msg:"rate already exists."});
                                return;
                            }
                            res.status(500).send(err);
                            return;
                        }

                        if (result) {
                            res.json({success: true});
                            
                        }
                    })

    } else {
        res.status(400).send({msg:"Please verify your request includes a rate"});
        return;
    }
})


module.exports = app;