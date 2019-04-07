const express = require('express');
const path = require('path');
const app = express();

var database = require('./routes/database');

var indexRouter = require('./routes/index');
var testPage = require('./routes/testPage');

app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.set('views', __dirname + '/views');

// TEST: Getting data on realtime database
app.get('/test', function (req, res) {
  database.ref('/Rooms/r001').once('value').then(function(snapshot) {
    var data = snapshot.val();
    res.send({room: data});
  });
});

app.use('/', indexRouter);

app.use('/testPage', testPage);

var lobbyCreator = require('./scripts/createLobby');
app.get('/newlobby', function(req, res) {
  // var ID = (Math.floor(Math.random() * 1001)).toString();
  lobbyCreator.createLobby(database ,res);
});

app.get('/lobby/:id', function(req, res) {
  var id = req.params['id'];
  res.render('lobby', {lobbyID: id});
});

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
