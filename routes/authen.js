var express = require('express');
var router = express.Router();
// var db = require('./firestore');
var database = require('./database');
var url = require('url');

// /authen

router.get('/:id', function(req, res, next) {
    var id = req.params['id'];
    res.render('login', { title: 'Log in', message: "", lobbyID: id });
});

module.exports = router;
