var express = require('express');
var app= express();

let page_views = 0;

app.get('/', function(req,res){

    if(page_views){
        page_views++;
        res.send("You visited this page:"+ page_views+ " times");
    } else {
        page_views = 1;
        res.send ("Welcome to this page for the first time!");
    }

});

app.listen(5000);