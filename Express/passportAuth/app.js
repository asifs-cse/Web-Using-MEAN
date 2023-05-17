const express = require("express");
const cors = require('cors');
const ejs = require('ejs');
const app = express();
require("../config/database");

app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//base url
app.get("/",(req, res)=>{
    res.render('index');
});

//register : get
app.get("/register",(req, res)=>{
    res.render('register');
});

//register : post
app.post("/register",(req, res)=>{
    try {
        res.status(201).send("user is created");
    } catch (error) {
        res.status(500).send(error.message);
    }
});
//login: get
app.get("/login",(req, res)=>{
    res.render('login');
});

//login: post
app.post("/login",(req, res)=>{
    try {
        res.status(201).send("user is login");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//profile protected route
app.get("/profile",(req, res)=>{
    res.render('profile');
});

//logout route
app.get("/logout", (req, res)=>{
    res.redirect("/");
})

module.exports = app;