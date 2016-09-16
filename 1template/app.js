var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World, I am heres again!');
});

app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// }).listen(8080, 'APP_PRIVATE_IP_ADDRESS');
// console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:8080/');

// test