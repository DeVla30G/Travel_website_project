var express = require('express');
const app = express();

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { default: axios } = require('axios');

// Validate email regex

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// Get age function


/**
 * @swagger
 * /register:
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
 *         description: All the info about the user you're trying to register
 *     schema:
 *           type: object
 *           required:
 *             - username
 *             - lastname
 *             - country
 *             - email
 *             - password
 *           properties:
 *            username:
 *               type: string
 *               example: Toto
 *            lastname:
 *               type: string
 *               example: toto
 *            country:
 *               type: string
 *               example: toto
 *            email:
 *               type: string
 *               example: toto.tata@gmail.com
 *            password:
 *               type: string
 *               example: mySuperSecretPassword
 *     responses:
 *       200:
 *         description: All the user's info
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict
 */
app.post("/", (req, res) => {
    let body = req.body;

    // Check if body is complete
    if (body.username && body.lastname && body.country && body.email && body.password) {

        // Check email
        if (validateEmail(body.email)) {


                // Hashing password
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    const username = req.body.username;
                    const lastname = req.body.lastname;
                    const avatar = req.body.avatar;
                    const country = req.body.country;
                    const email = req.body.email;
                    const password = hash;
                    const role = 'user';

                    con.query(`INSERT INTO users (username, lastname, avatar, country, email, password, role, created_at, update_at) VALUES ("${username}", "${lastname}", "${avatar}","${country}", "${email}", "${password}", "${role}", now(), now())`, async (err, result, fields) => {
                        if (err) {
                            if (err.code === "ER_DUP_ENTRY") {
                                return res.status(409).send({msg:"User already exists, change your username or email"});

                            }
                            return res.status(500).send(err);
                        }

                        if (result) {
                            axios.post('http://localhost:3020/login', {
                                email: body.email,
                                password: body.password
                            }).then(response => {
                                console.log(response);
                                res.status(200).send(response.data);
                                return;
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).send(err);
                                return;
                            })
                            let transporter = nodemailer.createTransport({
                                host: "smtp.mailtrap.io",
                                port: 2525,
                                auth: {
                                    user: "8a57e6c14cae64",
                                    pass: "d49a62fba4e291"
                                }
                              })

                            let link = 'http://localhost:8080/login';
                            const options = {
                                from: "fanny@mailtrap.com",
                                to: email,
                                subject: "Voyages - register confirm",
                                html: `<body style="font-family: sans-serif; text-align: center; background-color: #eee">
                                <div style="background-color: #fff; border-radius: 3px; position: absolute;
                                top: 50%;
                                -ms-transform: translateY(-50%);
                                transform: translate(-50%,-50%); padding: 30px 0px; left: 50%;">
                                  <img style="width: 10%;" src="https://something blob here or avatar pic" />
                                    <h3 style="margin-top: 20px;">Hello</h3>
                                  <p style="min-width: 400px; margin: 0 auto; margin-bottom: 20px;">
                                  Welcome on Voyages Voyages !<br>
                                  <br>
                                  Please confirm your account<br>
                                  <br>
                                  Click the button below to complete the process.
                                  </p>
                                  <a href="${link}" style="background-color: #F6A433; color : #fff; padding: 10px 7px; text-decoration: none; border-radius: 0.375rem;">Confirm account</a>
                                </div>
                              </body>`
                            }

                            transporter.sendMail(options, (err, info) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send(err);
                                    return;
                                }

                                console.log(info);
                                res.status(201).send({ msg: "The mail was successfully sent (if you can't see it, it is probably in your spams)." });
                                return
                            })
                        }
                    })

                });


        } else {
            res.status(400).send({msg:"Please verify you entered a correct email."});
            return;
        }

    } else {
        res.status(400).send({msg:"Please verify your request includes a username, a lastname, a country, an email and a password"});
        return;
    }
})

module.exports = app;