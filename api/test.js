var express = require('express');
var router = express.Router();
var database = require('../routes/database');

// TEST: Getting data on realtime database
router.get('/', function (req, res) {
    database.ref('/Rooms/r001').once('value').then(function(snapshot) {
      var data = snapshot.val();
      res.send({room: data});
    });
});

module.exports = router;