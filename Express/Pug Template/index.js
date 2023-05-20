const express = require("express");
const app = express();


//set pug engine
app.set('view engine','pug');
app.set('views','./views/');

app.get('/',(req, res)=>{
    res.render('home',{
        name: "My home page",
        url: "https://www.google.com/"
    });
});

app.get('/data',(req, res)=>{
    res.render('data',{
        users:{name:"Asif Shahriar", age:21},
        title: "Data page",
    });
});

app.listen(3000);