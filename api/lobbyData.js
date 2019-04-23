var express = require('express');
var router = express.Router();
var database = require('../routes/database');

// Get Lobby Data
router.get('/', function (req, res) {
  var roomID = req.query.roomID;
  database.ref('/Rooms/r' + roomID).once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
});

router.get('/players', function (req, res) {
  var roomID = req.query.roomID;
  database.ref('/Rooms/r' + roomID+'/players').once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
});

router.get('/question', function (req, res) {
  var roomID = req.query.roomID;
  var questionID = req.query.questionID;
  database.ref('/Rooms/r' + roomID+'/questions/question'+questionID).once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
});




module.exports = router;