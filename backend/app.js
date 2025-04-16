const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const wordController = require('./controller/word');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/hangman';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    next();
  });

app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).json({msg: error.message})
})

app.use(wordController);

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));