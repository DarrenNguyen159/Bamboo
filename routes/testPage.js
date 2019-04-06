var express = require('express');
var router = express.Router();
var database = require('./database');

let cookies_options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true // Indicates if the cookie should be signed
}

/* GET test page. */
router.get('/', function(req, res, next) {
    database.ref('/Rooms/r001').once('value').then(function(snapshot) {
        var data = snapshot.val();
        // console.log(data.players);
        res.render('test', {room: data});
    });  
});
  
module.exports = router;