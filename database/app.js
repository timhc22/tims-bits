require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var app = express();

app.set('port', 8081); // todo abstract this out
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

// connect to database
console.log('ENV:', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'testing') {
    mongoose.connect(process.env.TEST_DATABASE_URI);
} else {
    mongoose.connect(process.env.DATABASE_URI);
}

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


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BlogPost = new Schema({
    author    : ObjectId,
    title     : String,
    body      : String,
    date      : Date
});

var BlogPostModel = mongoose.model('BlogPost', BlogPost);
var blogPost = new BlogPostModel();
blogPost.title = 'hello';
blogPost.save(function (err) {
    //
});


module.exports = app;