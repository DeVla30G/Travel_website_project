const mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  database: "voyage",
  user: "vladi",
  password: "1234",
  port: "3306",
  multipleStatements: true
});

module.exports = con;