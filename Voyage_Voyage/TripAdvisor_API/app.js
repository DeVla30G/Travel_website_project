const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
const search = require('./routes/search')
const pictures = require('./routes/pictures')
const bodyParser = require('body-parser');
const formidable = require('express-formidable');

const port = process.env.PORT || 3300;

// error handler
app.use('/search', search );
app.use('/pictures', pictures );
app.use(cors());
app.use(formidable());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('Hello World! I`m comming!')
  })
app.route('/search')
.get((req, res) => {})

app.route('/pictures')
.get((req, res) => {})

app.listen(port, err => {
  if (err) {
    return console.log("message")
  }
  console.log(`Example app listening on port ${port}`)
});


module.exports = app;