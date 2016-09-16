var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var app = express();

app.set('port', 8081);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(app.get('port'), function () {
    console.log('App listening on port:' + app.get('port'));
});

app.get('/', function (req, res) {
    res.render('home', { title: 'Home' });
});

module.exports = app;