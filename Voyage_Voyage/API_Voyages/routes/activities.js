const express = require('express');
const app = express.Router();
const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");
const multer = require('../middleware/multer-config');

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

// Get activities

/**
 * @swagger
 * /activities:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Activities
 *     responses:
 *       200:
 *         description: OK
 */

app.get('/', (req, res) => {
    let sql = `SELECT * FROM activities`;
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


// Get one activity

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Activities
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:id', (req, res) => {
    let sql = `SELECT * FROM activities WHERE id =${req.params.id};`;
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
 * /activities:
 *   post:
 *      tags:
 *      - Activities
 *      description: this post an activity
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
                    const description = req.body.description;
                    const city_name = req.body.city_name;
                    const type = req.body.type;
                    const picture = req.body.picture;
                    
                    con.query(`INSERT INTO activities (name, user_id, description, city_name, type, picture, created_at) VALUES ("${name}", "${user_id}", "${description}", "${city_name}", "${type}", "${picture}", now())`, async (err, result, fields) => {
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                res.status(409).send({msg:"activity already exists."});
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
        res.status(400).send({msg:"Please verify your request includes name of the activity"});
        return;
    }
})

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     produces:
 *       - application/json
 *     tags:
 *       - Activities
 *     responses:
 *       200:
 *         description: OK
 */

app.delete("/:id", (req, res) => {

    let sql = `DELETE FROM activities WHERE id = ${req.params.id};`

    con.query(sql, async (result, fields) => {
        if (result) {
            res.json({success: true});
            }

    });
 });

module.exports = app;