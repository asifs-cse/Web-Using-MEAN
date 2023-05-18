const express = require("express");
const app = express();
const cors = require('cors');
const ejs = require('ejs');
const userModel = require("./models/user.model");
require("./config/database");
require("./config/passport");

//store session
const mongoStore = require("connect-mongo");

const passport = require("passport");
const session = require("express-session");

//create session
app.set("trust proxy",1);
app.use(
    session({
        secret: "keybord cat",
        resave: false,
        saveUninitialized: true,
        store: mongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/passportAuthUser",
            collectionName: "sessions",
        })
        //cookie: {secure: true},
    })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//password encryption
const bcrypt = require('bcrypt');
const saltRounds =10;

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
app.post("/register",async (req, res)=>{
    try {
        const user = await userModel.findOne({username: req.body.username});
        if(user){
            return res.status(400).send("user is already created");
        }else{
            bcrypt.hash(req.body.password,  saltRounds,async (err, hash)=>{
                const newUser = new userModel({
                    username: req.body.username,
                    password: hash
                });
                await newUser.save();
                res.status(201).redirect("/login");
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//check login
const checkloggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/profile");
    }
    next();
}
//login: get
app.get("/login",checkloggedIn,(req, res)=>{
    res.render('login');
});

//login: post
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', successRedirect: "/profile" }),
  function(req, res) {
    res.redirect('/');
});

//protect profile
//check login
const checkAuthed = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//profile protected route
app.get("/profile", checkAuthed, (req, res)=>{
    res.render("/profile");
});

//logout route
app.get("/logout", (req, res)=>{
    try {
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            res.redirect("/");
        })
    } catch (error) {
        res.status(500).send(erroor.message);
    }
});



module.exports = app;