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

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *      tags:
 *      - Users
 *      description: this returns user by id and update it
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

    if (body.email && body.password) {

        // Check email
        if (validateEmail(body.email)) {
            // Hashing password
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                const username = req.body.username;
                const lastname = req.body.lastname;
                const email = req.body.email;
                const password = hash;

                con.query(`UPDATE users SET username = "${username}", lastname = "${lastname}", email = "${email}", password = "${password}" WHERE id =${req.params.id};`, async (err, result, fields) => {
                    if (err) {
                        if (err.code == "ER_DUP_ENTRY") {
                            res.status(409).send({msg:"User already exists."});
                            return;
                        }
                        res.status(500).send(err);
                        return;
                    }
                    if (result) {
                    res.json({success: true});
                    }
                })
            })
        } else {
            res.status(400).send({msg:"Please verify you entered a correct email."});
            return;
        }
    } else {
        res.status(400).send({msg:"Please verify your request includes an email and a password"});
        return;
    }
})


module.exports = app;