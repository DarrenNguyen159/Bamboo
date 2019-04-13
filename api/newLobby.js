var express = require('express');
var router = express.Router();
var database = require('../routes/database');

function randomId() {
  var rand = String(Math.floor(Math.random() * 1001) + 1);
  var len = rand.length;
  var randStr = "";
  switch (len) {
    case 1: 
      randStr = "000" + rand;
      break;
    case 2:
      randStr = "00" + rand;
      break;
    case 3:
      randStr = "0" + rand;
      break;
    default:
      randStr = rand;
  }
  return randStr;
}

router.get('/', function (req, res) {
  var randId = randomId();
  database.ref('/Rooms/' + randId).once('value').then(function(snapshot) {
    var data = snapshot.val();
    if (data == null) {
      // Valid new Id
      var roomData = {id:randId, status: "lobby"};
      database.ref('/Rooms/' + randId).set(roomData);
      res.send(roomData);
    }
    else {
      // Invalid new Id
      res.send(null);
    }
  });
});

module.exports = router;