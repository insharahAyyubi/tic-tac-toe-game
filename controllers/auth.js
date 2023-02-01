const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: '9335611344iI#',
    database: process.env.DATABASE
 });

exports.index = (req, res) => {
    console.log(req.body);
    const { uname, email, password, cpassword } = req.body;
   db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) => {
    if(error)
    {
        console.log(error);
    }
    if(results.length > 0)
    { 
        return res.render('index', {
            message: 'Email is already in use'
        })
    }
    else if(password !== cpassword)
    {
        return res.render('index', {
            message: 'Passwords do not match'
        });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
    
    db.query('INSERT INTO users SET ?', {name: uname, email: email, password: password}, (error, results) => {
        if(error)
        {
            console.log(error);
        }
        else
        {
            return res.render('index', {
                register: 'User Registered'
            });
            return res.end();  
        }
    })
   })

}
exports.login = (req, res) => {
    const {email, password} = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?',[email, password], function (error, results, fields)
    {
        if(results.length > 0)
        {
            return res.render('index2');
        }
        else
        {
            return res.render('index',{
            message: 'Login credentials do not match!'});
        }
        res.end();
    })
}
