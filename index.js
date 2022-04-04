"use strict";
exports.__esModule = true;
var http = require('http');
var wrapper_1 = require("./wrapper");
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// First route
app.get('/:key?', function (req, res) {
    var key = req.params.key;
    if (key !== undefined && key !== null) {
        var highLevelStorage = new wrapper_1["default"]();
        highLevelStorage.get(key).then(function (data) {
            res.json({ message: 'Answer from GET: ' + JSON.stringify(data) });
        })["catch"](function (err) {
            console.log(err);
            res.json({ message: 'Answer from GET: ' + err });
        });
    }
    else {
        var routes = {
            paths: [
                { route: '/:key' },
                {
                    route: '/putData/:key',
                    message: 'Pass data in body in URL Encoded. Visit this URL to see. https://screenpresso.com/=FQHDb'
                },
                {
                    route: '/deleteData/:key'
                },
                {
                    route: '/batchPut',
                    message: 'Pass data in body in JSON. Visit this URL to see. https://screenpresso.com/=MgWPc'
                },
            ]
        };
        res.json({ routes: routes });
    }
});
app.put('/putData/:key', urlencodedParser, function (req, res) {
    var key = req.params.key;
    var body = req.body;
    var highLevelStorage = new wrapper_1["default"]();
    highLevelStorage.put(key, body.value).then(function (data) {
        res.json({ message: 'Data Updated: ' + JSON.stringify(data) });
    })["catch"](function (err) {
        console.log(err);
        res.json({ message: 'Error: ' + err });
    });
});
app.put('/batchPut', function (req, res) {
    var body = req.body;
    var highLevelStorage = new wrapper_1["default"]();
    highLevelStorage.batchPut(body).then(function (data) {
        res.json({ message: 'Batch Data Updated: ' + JSON.stringify(data) });
    })["catch"](function (err) {
        console.log(err);
        res.json({ message: 'Error: ' + err });
    });
    // res.json("Pass Data in body in JSON format");
});
app["delete"]('/deleteData/:key', urlencodedParser, function (req, res) {
    var key = req.params.key;
    var highLevelStorage = new wrapper_1["default"]();
    highLevelStorage.del(key).then(function (data) {
        res.json({ message: 'Data deleted: ' + JSON.stringify(data) });
    })["catch"](function (err) {
        console.log(err);
        res.json({ message: 'Error: ' + err });
    });
});
// Starting server
app.listen('3000');
