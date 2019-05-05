var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var message = req.query.message || '';
	var title = req.query.title || 'BAMBOO';
    res.render('index', { title: title, message: message }); // index.hbs file is rendered
});

module.exports = router;
