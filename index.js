var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/game'));

// app.get('/', function(req, res) {
//     res.send("Hello world");
// });

http.listen(3000, function(req, res) {
    console.log("server running on 3000");
})