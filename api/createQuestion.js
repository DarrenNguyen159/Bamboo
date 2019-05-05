var express = require('express');
var router = express.Router();
var database = require('../routes/database');

router.post('/', function(req, res, next) {
    var data = req.body;
    console.log("CREATE PACKS:" + JSON.stringify(data));



    res.send({response: "OK"});
});

module.exports = router;
