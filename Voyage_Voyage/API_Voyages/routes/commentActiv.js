const express = require('express');
const app = express.Router();

const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");

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
    let sql = `SELECT * FROM comment WHERE activity_id =${req.params.id};`;
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
module.exports = app;