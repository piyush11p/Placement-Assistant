const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// MongoDB connection URL
const mongoURL= 'mongodb+srv://admin-aryan:P36l69Y9Njq0ekAc@cluster0.ca3e4px.mongodb.net/placementAss';

// Connect to MongoDB
mongoose.connect(mongoURL);

// Defining Schema
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const Admin = mongoose.model('Admin', AdminSchema);

app.post('/register', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check if a user with this username already exists
    await Admin.create({
        username: username,
        password: password
    })
    res.redirect("/");
    
});

app.post('/login', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({
        username,
        password
    })
    if (user) {
        res.redirect("/mainPage");
    } else {
        // res.status(411).json({
        //     message: "Incorrect email and pass"
        // })
        res.render("unSuccess");
    }
});

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/mainPage",function(req,res){
    res.render("ui");
})

app.get("/details", function(req,res){
    res.render("add");
})

app.get("/feedback", function(req, res){
    res.render("feed");
})

app.get("/sucessfull", function(req,res){
    res.render("success");
})

app.get("/logout", (req, res) => {
    // clear the cookie
    res.clearCookie("username");
    // redirect to login
    return res.redirect("/login");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
