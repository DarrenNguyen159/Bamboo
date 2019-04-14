var express = require('express');
var router = express.Router();
var database = require('../routes/database');

// Get Lobby Data
router.get('/:id', function (req, res) {
  var id = req.params['id'];
  database.ref('/Rooms/' + id).once('value').then(function(snapshot) {
    res.send(snapshot.val());
  });
});

module.exports = router;