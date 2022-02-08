const express = require("express");
const path = require("path");
var indexroutes = require("./routes");
const app = express();
const session = require('express-session');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');


// mongoose.connect("mongodb://localhost/cycoin");
//new api
const flash = require('express-flash');


app.use(session({
    secret: 'userdetails',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

// Set public folder
app.use(express.static(path.join(__dirname,'/public')));
//app.use(express.static(path.join(__dirname, 'logo')));

app.use(flash())

app.use("/", indexroutes);

const PORT = 3002;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));