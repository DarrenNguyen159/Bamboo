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
// Get a reference to the database service
var database = firebase.database();

app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.set('views', __dirname + '/views');

// TEST: Getting data on realtime database
app.get('/test', function (req, res) { 
  console.log("req test");
  database.ref('/Rooms/r001').once('value').then(function(snapshot) {
    var data = snapshot.val();
    console.log(data.players);
    res.send({timer: data.timer});
  });
});

app.get('/testPage', function(req, res) {
  database.ref('/Rooms/r001').once('value').then(function(snapshot) {
    var data = snapshot.val();
    // console.log(data.players);
    res.render('test', {room: data});
  });
});

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
