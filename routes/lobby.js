var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('host/lobby', { lobbyID: 'None' }); // index.hbs file is rendered
});

module.exports = router;
