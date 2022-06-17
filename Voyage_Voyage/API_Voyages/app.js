const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const createError = require('http-errors');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs");
const con = require('./config/db.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const port = process.env.PORT || 3020;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
          tittle: 'API voyage',
          description: 'An entry point API assembeling different external APIs',
          contact: {
            name: "VlaSamFani"
          },
          servers: ["http://localhost:3020"]
        }
    },
    apis: ["./routes/*.js", 'app.js']
};
/**
 * @swagger
 * securityDefinitions:
 *   JWT Token:
 *     type: apiKey
 *     name: Authorization
 *     description: Put "Bearer token" in the input for it to work.
 *     in: header
 *   Password Token:
 *     type: apiKey
 *     name: Password Authorization
 *     description: Put "Bearer token" in the input for it to work.
 *     in: header
 */
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json({limit: '500kb'}));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
global.con = require("./config/db.js");



// Auto import routes
fs.readdirSync("./routes/").forEach(file => {
  file = file.slice(0, file.length - 3);
  let currentRoute = require("./routes/" + file);
  console.log("/" + file);
  app.use("/" + file, currentRoute);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({code: err.status, message: res.locals.message});
});
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

/*const user = {
  id: '12',
  name : 'test',
  email: 'test@test.fr',
  admin: true
};
function generateAccessToken(user) {
  return jwt.sign((user, process.env.ACCESS_TOKEN_SECRET))
};
const accessToken = generateAccessToken(user);
console.log('accessToken', accessToken);*/

module.exports = app;