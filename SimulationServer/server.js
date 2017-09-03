var express = require('express');
var app = express();
var url = require("url");
var util = require("util");
var hotload = require("hotload");
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

console.log("init Simulation Server......");
app.all('*', function (req, res, next) {
    //   res.header('Access-Control-Allow-Origin', 'http://localhost:8088');
    //   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    //   res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.header('Access-Control-Allow-Origin', 'http://localhost:9998');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
    //   next();
});
app.get("/simserver/:pagesize/:curpage/*", function (req, res) {
    console.log("+++++++++");
    console.dir(req.params);
    var queryObj = url.parse(req.url, true);
    console.log("[simserver get]" + queryObj.query.entity);
    var dataServer = hotload("./" + queryObj.query.entity);
    var pageInfo = {
        pageSize: req.params.pagesize,
        curPage: req.params.curpage
    };
    var data = dataServer.request(queryObj, req, pageInfo);
    res.json(data);
});
app.post("/simserver/:pagesize/:curpage/*", function (req, res) {
    console.log("+++++++++");
    console.dir(req.params);
    var queryObj = url.parse(req.url, true);
    console.log("[simserver get]" + queryObj.query.entity);
    var dataServer = hotload("./" + queryObj.query.entity);
    var pageInfo = {
        pageSize: req.params.pagesize,
        curPage: req.params.curpage
    };
    var data = dataServer.request(queryObj, req, pageInfo);
    res.json(data);
});
app.get("/simserver/*", function (req, res) {
    console.log("+++++++++");
    console.dir(req.params);
    var queryObj = url.parse(req.url, true);
    console.log("[simserver get]" + queryObj.query.entity);
    var dataServer = hotload("./" + queryObj.query.entity);
    var data = dataServer.request(queryObj, req);
    res.json(data);
});
app.post("/simserver/*", function (req, res) {
    var queryObj = url.parse(req.url, true);
    // console.log("[simserver post]" + queryObj.query.entity);
    var dataServer = hotload("./" + queryObj.query.entity);
    // console.log(JSON.stringify(req.body));
    var data = dataServer.request(queryObj, req);
    res.json(data);
});


var server = app.listen(8089, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("后台数据请求地址为 http://localhost:%s/simserver", port);
});