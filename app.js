const express = require("express");
const mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config({path: './.env'});
var bodyParser = require('body-parser')
const app = express();


app.use(cors());


 const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: '9335611344iI#',
    database: process.env.DATABASE
 });

const publicDirectory = path.join(__dirname + '/public');
app.use(express.static(publicDirectory));

 db.connect((err) => {
    if(err)
    console.log(err);
    else
    console.log("MYSQL connected!");
})

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', (require('./routes/pages')));
app.use('/auth', (require('./routes/auth')));

app.listen(5000, () => {
    console.log("Server started");
 })
