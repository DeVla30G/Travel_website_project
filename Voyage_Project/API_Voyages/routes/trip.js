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

// Get trips

/**
 * @swagger
 * /trip:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Trips
 *     responses:
 *       200:
 *         description: OK
 */

app.get('/', (req, res) => {
    let sql = `SELECT id, name, user_id, city_name, LocalName, DATE_FORMAT(start_date, "%M %e %Y") as start_date, DATE_FORMAT(end_date, "%M %e %Y") as end_date, description FROM trip`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let trip = result.map(trip => {
                return trip;
            })
            return res.status(200).send(trip);
        }
    });
    return ;
})


// Get one trip

/**
 * @swagger
 * /trip/{id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Trips
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:id', (req, res) => {
    let sql = `SELECT id, name, user_id, city_name, LocalName, DATE_FORMAT(start_date, "%M %e %Y") as start_date, DATE_FORMAT(end_date, "%M %e %Y") as end_date, description FROM trip WHERE id =${req.params.id};`;
    con.query(sql, (err, result, fields) => {
        if(err) return res.status(500).send(err);

        if(result) {
            if(result.length == 0) return res.status(404).send({message: "Trip not found"});
            let trip = result[0];
            return res.status(200).send(trip);
        }
    });
    return;
})


/**
 * @swagger
 * /trip:
 *   post:
 *      tags:
 *      - Trips
 *      description: this post a trip
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
    if (body.name) {
             
                    const name = req.body.name;
                    const user_id = req.body.user_id;
                    const city_name = req.body.city_name;
                    const LocalName = req.body.LocalName;
                    const start_date = req.body.start_date;
                    const end_date = req.body.end_date;
                    const description = req.body.description;
                    
                    con.query(`INSERT INTO trip (name, user_id, city_name, LocalName, start_date, end_date, description, created_at) VALUES ("${name}", "${user_id}", "${city_name}", "${LocalName}", "${start_date}", "${end_date}", "${description}", now())`, async (err, result, fields) => {
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                res.status(409).send({msg:"Trip already exists."});
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
        res.status(400).send({msg:"Please verify your request includes name of the Trip"});
        return;
    }
})


/**
 * @swagger
 * /trip/{id}:
 *   patch:
 *      tags:
 *      - Trips
 *      description: this returns trip by id and update it
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

 app.patch("/:id", (req, res) => {
    let body = req.body;

    if (body.description) {
       
                const start_date = req.body.start_date;
                const end_date = req.body.end_date;
                const description = req.body.description;

                con.query(`UPDATE trip SET start_date = "${start_date}", end_date = "${end_date}", description = "${description}" WHERE id =${req.params.id};`, async (err, result, fields) => {
                    if (err) {
                        if (err.code == "ER_DUP_ENTRY") {
                            res.status(409).send({msg:"Trip already exists."});
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
        res.status(400).send({msg:"Please verify your request includes a description"});
        return;
    }
})

/**
 * @swagger
 * /trip/{id}:
 *   delete:
 *     produces:
 *       - application/json
 *     tags:
 *       - Trips
 *     responses:
 *       200:
 *         description: OK
 */

app.delete("/:id", (req, res) => {

    let sql = `DELETE FROM trip WHERE id = ${req.params.id};`

    con.query(sql, async (err, result, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (result) {
            res.json({success: true});
            }

    });
 });

module.exports = app;