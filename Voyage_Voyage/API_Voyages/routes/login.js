const express = require('express');
const app = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *       - text/plain
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The credentials to be used to login
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: email@test.com
 *             password:
 *               type: string
 *               example: 1234
 *     responses:
 *       200:
 *         description: All the user's info
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
    if (body.email && body.password) {

        let sql = "";

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (validateEmail(body.email)) sql = `SELECT * FROM users WHERE email="${body.email}"`
        else sql = `SELECT * FROM users WHERE username="${body.username}"`;

        con.query(sql, (err, result, fields) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if (result) {
                if(result.length == 0) return res.status(404).send({msg: "User not found"});
                let user = result[0];

                bcrypt.compare(body.password, user.password, (err, equal) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    if (equal) {
                        delete user.password;
                        delete user.reset_password_token;
                        console.log(user);
                        const token =jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
                        user.jwt = token;
                        console.log(user.jwt)
                        res.send(user);
                    } else {
                        res.status(403).send({ msg: "Wrong password." });
                        return;
                    }
                });
                return;
            }
        })

    } else {
        res.status(401).send({ msg: "Please make sure your request includes a email and a password" });
        return;
    }
});

module.exports = app;