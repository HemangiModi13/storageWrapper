var http = require('http');
import Wrapper from './wrapper';
const express = require('express');
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// First route
app.get('/:key?', (req, res) => {
    const key = req.params.key;
    if (key !== undefined && key !== null) {
        const highLevelStorage = new Wrapper();
        highLevelStorage.get(key).then((data) => {
            res.json({ message: 'Answer from GET: ' + JSON.stringify(data) });
        }).catch((err) => {
            console.log(err);
            res.json({ message: 'Answer from GET: ' + err });
        });
    }
    else {
        let routes = {
            paths: [
                { route: '/:key' },
                {
                    route: '/putData/:key',
                    message: 'Pass data in body in URL Encoded. Visit this URL to see. https://screenpresso.com/=FQHDb'
                },
                {
                    route: '/deleteData/:key',
                },
                {
                    route: '/batchPut',
                    message: 'Pass data in body in JSON. Visit this URL to see. https://screenpresso.com/=MgWPc'
                },
            ]
        }
        res.json({ routes: routes });
    }

})

app.put('/putData/:key', urlencodedParser, (req, res) => {
    const key = req.params.key;
    const body = req.body;

    const highLevelStorage = new Wrapper();

    highLevelStorage.put(key, body.value).then((data) => {
        res.json({ message: 'Data Updated: ' + JSON.stringify(data) });
    }).catch((err) => {
        console.log(err);
        res.json({ message: 'Error: ' + err });
    });
})

app.put('/batchPut', (req, res) => {
    const body = req.body;
    const highLevelStorage = new Wrapper();

    highLevelStorage.batchPut(body).then((data) => {
        res.json({ message: 'Batch Data Updated: ' + JSON.stringify(data) });
    }).catch((err) => {
        console.log(err);
        res.json({ message: 'Error: ' + err });
    });
    // res.json("Pass Data in body in JSON format");
})

app.delete('/deleteData/:key', urlencodedParser, (req, res) => {
    const key = req.params.key;

    const highLevelStorage = new Wrapper();

    highLevelStorage.del(key).then((data) => {
        res.json({ message: 'Data deleted: ' + JSON.stringify(data) });
    }).catch((err) => {
        console.log(err);
        res.json({ message: 'Error: ' + err });
    });
})

// Starting server
app.listen('3000')