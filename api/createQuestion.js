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

router.post('/', function(req, res, next) {
  var qPack = req.body;
  console.log("CREATE PACKS:" + JSON.stringify(qPack));
  var randId = randomId();
  database.ref('/QuestionPacks/q' + randId).once('value').then(function(snapshot) {
      var data = snapshot.val();
      if (data == null) {
          // Valid new Id
          database.ref('/QuestionPacks/q' + randId).set(qPack);
          res.send({response: "Create Question Pack successfully!"});
        }
        else {
          // Invalid new Id
          res.send({response: "Fail on creating question pack, try again maybe :("});
        }
  });;
});

module.exports = router;
