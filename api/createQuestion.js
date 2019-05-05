var express = require('express');
var router = express.Router();
var database = require('../routes/database');

router.post('/', function (req, res) {
    var data = req;
    console.log(JSON.stringify(data));
});

module.exports = router;
