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

// Get comments

/**
 * @swagger
 * /comment:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: OK
 */

app.get('/', (req, res) => {
    let sql = `SELECT * FROM comment`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let comment = result.map(comment => {
                return comment;
            })
            return res.status(200).send(comment);
        }
    });
    return ;
})

// Get comments by activity id

/**
 * @swagger
 * /comments/{activity_id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: OK
 */

 app.get('/:id', (req, res) => {
    let sql = `SELECT * FROM comment WHERE id =${req.params.id};`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let comments = result.map(comments => {
                return comments;
            })
            return res.status(200).send(comments);
        }
    });
    return ;
})




/**
 * @swagger
 * /comment:
 *   post:
 *      tags:
 *      - Comments
 *      description: this post a comment
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
    if (body.text) {

                    const text = req.body.text;
                    const user_id = req.body.user_id;
                    const username = req.body.username;
                    const activity_id = req.body.activity_id;
                    const image = req.body.image;
                    
                    con.query(`INSERT INTO comment (text, user_id, username, activity_id, image, created_at) VALUES ("${text}", "${user_id}", "${username}", "${activity_id}", "${image}", now())`, async (err, result, fields) => {
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                res.status(409).send({msg:"comment already exists."});
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
 * /comment/{id}:
 *   delete:
 *     produces:
 *       - application/json
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: OK
 */

app.delete("/:id", (req, res) => {

    let sql = `DELETE FROM comment WHERE id = ${req.params.id};`

    con.query(sql, async (result, fields) => {
        if (result) {
            res.json({success: true});
            }

    });
 });

module.exports = app;