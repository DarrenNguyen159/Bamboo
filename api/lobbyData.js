var express = require('express');
var router = express.Router();
var database = require('../routes/database');

// Get Lobby Data
router.get('/', function (req, res) {
  var roomID = req.query.roomID;
  database.ref('/Rooms/r' + roomID).once('value').then(function (snapshot) {
    res.json(snapshot.val());
  });
});
// router.get('/:id', function (req, res) {
//   var id = req.params['id'];
//   database.ref('/Rooms/r' + id).once('value').then(function(snapshot) {
//     res.send(snapshot.val());
//   });
// });

router.get('/players', function (req, res) {
  var roomID = req.query.roomID;
  database.ref('/Rooms/r' + roomID + '/players').once('value').then(function (snapshot) {
    res.json(snapshot.val());
  });
});

router.get('/question', function (req, res) {
  var roomID = req.query.roomID;
  var questionPacksId = req.query.questionPacksId;
  var questionNumber = req.query.questionNumber;
  database.ref('/QuestionPacks/q' + questionPacksId + '/question' + questionNumber).once('value').then(function (snapshot) {
    res.json(snapshot.val());
  });
});




module.exports = router;