var express = require('express');
var router = express.Router();

router.get('/api/data', function (req, res, next) {
    res.json({data: 'data'});
});

module.exports = router;
