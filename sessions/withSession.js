var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({
    secret:"124983982538954980980kjdsfkjd", // unique ID as a string
    resave:false, // because some stores will delete unused sessions after some time
    saveUninitialized:false // the session cookie will not be set on the browser unless the session is modified.
}));

app.get('/', function(req,res){

    // The session is attached to the request, so you can access it using req.session.page_views here:
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page:"+ req.session.page_views+ " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

app.listen(5000);