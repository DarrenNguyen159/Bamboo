var express = require('express');
var router = express.Router();
var database = require('../routes/database');

// TEST: Getting data on realtime database
router.get('/:id', function (req, res) {
  var id = req.params['id'];
  database.ref('/Rooms/' + id).once('value').then(function(snapshot) {
    res.send(snapshot.val());
  });
});

module.exports = router;