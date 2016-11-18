require('dotenv').config();
var express = require('express');
var router = express.Router();
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var app = express();

app.set('port', 8081); // add to gulp file too // todo abstract this out
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.listen(app.get('port'), function () {
    console.log('App listening on port:' + app.get('port'));
});

// routes
app.get('/', function (req, res) {
    res.render('home', { title: 'Home' });
});

// api
router.get('/api/data', function (req, res, next) {
    res.json({data: 'data'});
});

module.exports = app;