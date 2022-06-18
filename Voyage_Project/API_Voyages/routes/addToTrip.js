const express = require('express');
const app = express.Router();

const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");


// Get one add

/**
 * @swagger
 * /addToTrip/{id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - AddToTrip
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:id', (req, res) => {
    let sql = `SELECT * FROM addToTrip WHERE trip_id =${req.params.id};`;
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



/**
 * @swagger
 * /addToTrip:
 *   post:
 *     tags:
 *       - AddToTrip
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The credentials to be used to addToTrip
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: add activities To Trip
 *         content:
 *           application/json
 *       403:
 *         description: Forbidden
 *         content:
 *           text/plain
 *       401:
 *         description: Bad request
 *         content:
 *           text/plain
 */
app.post("/", (req, res) => {
    let body = req.body;
    if (body.activity_name) {
             
                    const user_id = req.body.user_id;
                    const activity_name = req.body.activity_name;
                    const activity_id = req.body.activity_id;
                    const trip_id = req.body.trip_id;
                    
                    con.query(`INSERT INTO addToTrip (user_id, activity_name, activity_id, trip_id, created_at) VALUES ("${user_id}","${activity_name}", "${activity_id}", "${trip_id}", now())`, async (err, result, fields) => {
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                res.status(409).send({msg:"Add already exists."});
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
        res.status(400).send({msg:"Please verify your request includes text"});
        return;
    }
})

/**
 * @swagger
 * /addToTrip/{id}:
 *   delete:
 *     produces:
 *       - application/json
 *     tags:
 *       - AddToTrip
 *     responses:
 *       200:
 *         description: OK
 */

 app.delete("/:id", (req, res) => {
    let body = req.body;
    const trip_id = req.body.trip_id;
    let sql = `DELETE FROM addToTrip WHERE activity_id = ${req.params.id} and trip_id = ${req.body.trip_id};`

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