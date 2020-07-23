// STEP 1: DEFINE REQUIREMENTS:

var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');

// STEP 2: DEFINE COMMUNICATION INFORMATION:

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'alper',
    password: '654321',
    database: 'fbw10'
});

// STEP 1.1: CREATE EXPRESS OBJECT:
var app = express();



// STEP 3: STORE SESSION DATA:
app.use(session({
    secret : 'secret', // uniquie ID as a string - This is mandatory!
    resave: false, // to store unused sessions after some time and update
    saveUninitialized: false // the session cookie will be set on the browser when the session is modified
}));

// STEP 4: USE BODY PARSER:
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// STEP 5: GET REQUEST:

// STEP 5.1 : GET HOME:
    app.get ('/',function(request, response){
        response.sendFile(path.join(__dirname,'/views/home.html'));
    });

// STEP 5.2: GET LOGIN:
    app.get ('/login',function(request, response){
        response.sendFile(path.join(__dirname,'/views/login.html'));
    });

// STEP 5.3: GET WELCOME:
    app.get ('/welcome',function(request, response){
        response.sendFile(path.join(__dirname,'/views/welcome.html'));
    });

// STEP 6: POST REQUEST:

    app.post('/auth', function(request,response){
        console.log(request.body);
        var username = request.body.username;
        var password = request.body.password;

        if ( username && password){

            connection.query('SELECT * FROM accounts WHERE username=? AND password=?',[username,password],function(error, results, fields){

                //console.log(results); // match id, username, password ,email data in DB
                //console.log(fields); // field data for each column for id, username, password ,email
                //console.log(results.lenght); // will be 1

                if (results.length > 0) {

                    request.session.loggedin = true;
                    request.session.username = username;
                    request.session.password = password;
                    response.redirect('/welcome');
                } else {
                    response.send('Incorrect Username and/or Password!');

                }
                response.end();

            });

        }

    });

app.listen(8080);