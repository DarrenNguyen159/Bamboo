var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var id = req.params['id'];
    res.render('host/lobby', { lobbyID: id }); // index.hbs file is rendered
});

module.exports = router;
