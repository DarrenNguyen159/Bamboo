const firebase = require('firebase');
const express = require('express');
const path = require('path');
const app = express();

var indexRouter = require('./routes/index');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBKheAnyvSFQtaMUwlaQ_7T-q5-Z9hmuQc",
    authDomain: "bamboo-cda5f.firebaseapp.com",
    databaseURL: "https://bamboo-cda5f.firebaseio.com",
    projectId: "bamboo-cda5f",
    storageBucket: "bamboo-cda5f.appspot.com",
    messagingSenderId: "550416420066"
};

firebase.initializeApp(config);
var database = firebase.firestore();

app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.set('views', __dirname + '/views');

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500 );
  res.render('error', { title: 'Not Found' }); // error.hbs file is rendered
});

module.exports = app;
