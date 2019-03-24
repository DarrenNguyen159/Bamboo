var express = require('express');
var router = express.Router();

let cookies_options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'E-Learning' }); // index.hbs file is rendered
});

module.exports = router;
