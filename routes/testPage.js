var express = require('express');
var router = express.Router();
var database = require('./database');

/* GET test page. */
router.get('/', function(req, res, next) {
    database.ref('/Rooms/r001').once('value').then(function(snapshot) {
        var data = snapshot.val();
        // console.log(data.players);
        res.render('test', {room: data});
    });  
});
  
module.exports = router;