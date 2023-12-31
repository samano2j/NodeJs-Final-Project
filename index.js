require('dotenv').config()
const express = require('express')
const axios = require('axios')
const path = require('path')
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, "client", "dist")))
app.use(express.static(path.join(__dirname, "../client/dist")));

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
app.use(cookieParser());
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
const { MongoClient } = require('mongodb');
const MongoStore = require('connect-mongo');
const mongoURL = process.env.MONGO_URL;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
const client = new MongoClient(mongoURL, mongoOptions);

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: MongoStore.create({ client }),
}));


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

app.get('/api/health', (req, res) => res.json({ msg: "Healthy!" }))

app.use('/api', require('./routes/music.routes'))

app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });