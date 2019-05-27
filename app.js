// app.js 


// set up
// ==================================================

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// set up our express application 
// =======================================================================
app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Routes
// use res.render to load up an ejs view file
app.set('views', __dirname + '/views');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended:true}));

// parse application/json 
app.use(bodyParser.json());

// use cookie parser 
app.use(cookieParser());


// ----------------------- CONFIGURATION --------------------------------------//
// router files 
app.use('/', require('./routes/index'));
app.use('/authen', require('./routes/authen'));
app.use('/lobby', require('./routes/lobby'));
app.use('/player', require('./routes/player'));
app.use('/host', require('./routes/host'));
app.use('/createQuestionPacks', require('./routes/createQuestionPacks'));
app.use('/cleanDb', require('./routes/cleanDb'));

// API
app.use('/newLobby', require('./api/newLobby'));
app.use('/createPacks', require('./api/createQuestion'));
app.use('/lobbyData', require('./api/lobbyData').router);
//
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use('/admin', require('./routes/adminLogin'));

// ----------------------- END OF CONFIGURATION --------------------------------//


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
