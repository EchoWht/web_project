/**
 * Created by Administrator on 2016-05-27.
 */
var http=require('http');
var mysql=require('mysql');

var server=http.createServer(function (req,res) {
    var body="<h1>Hello World!</h1>"
    // res.setHeader('Content-Length',body.length);
    // res.setHeader('Content-Type','text/html');
    res.end(body);

});
server.listen(8888);
console.log('Start');