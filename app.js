const express = require('express');
const path = require('path');
const app = express();

// var database = require('./routes/database');

var indexRouter = require('./routes/index');
var testPage = require('./routes/testPage');
var lobbyRouter = require('./routes/lobby');

var testAPI = require('./api/test');

app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Routes
// use res.render to load up an ejs view file
app.set('views', __dirname + '/views');

app.use('/', indexRouter);

app.use('/testPage', testPage);

app.use('/lobby', lobbyRouter);

// API
app.use('/test', testAPI);

// var lobbyCreator = require('./scripts/createLobby');
// app.get('/newlobby', function(req, res) {
//   // var ID = (Math.floor(Math.random() * 1001)).toString();
//   lobbyCreator.createLobby(database ,res);
// });

// app.get('/lobby/:id', function(req, res) {
//   var id = req.params['id'];
//   database.ref('/Rooms/' + id).set({status: 'lobby'});
//   res.render('lobby', {lobbyID: id});
// });

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
