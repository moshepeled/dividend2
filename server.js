const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
var site = require('./site');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'react_exp_mlab/build')));
app.get('/ping', function (req, res) {
    console.log("pong");
    return res.send('pong');
});

var MongoClient = require('mongodb').MongoClient;
const config = require('./config');

// MongoClient.connect(url, function (err, dbc) {
//     if (err) {
//         console.log('error', err);
//     } else {
//         console.log("Connecting to MongoDB!");
//     }
// });

app.get('/data', (req, res) => {
    console.log("data");
    MongoClient.connect(config.MONGO_URI, (err, db) => {
        if (err) {
            console.log('error');
            console.log(err);
        } else {
            // console.log(db);
            // db.collection("dividend").find().toArray(function (err, docs) {
            //     if (err) {
            //         // Reject the Promise with an error
            //         console.log('error', err);
            //     } else {

            //         // Resolve (or fulfill) the promise with data
            //         console.log(docs);
            //     }
            // });
            const cursor = db.collection('dividend');
            console.log(typeof cursor);
            const totals = cursor.find().toArray(function (err, docs) {
                if (err) {
                    // Reject the Promise with an error
                    console.log('error', err);
                } else {

                    // Resolve (or fulfill) the promise with data
                    // console.log(docs);
                    res.send(docs);
                }
            });
            // console.log(typeof totals);
            // console.log(JSON.stringify(totals));
            // db.close();
        }
    });
});
// app.get('/data', (req, res) => {
//     MongoClient.connect(url, (err, db) => {
//         console.log(db);
//         var collection = db.collection('dividend');
//         collection.find({}).toArray((err, docs) => {
//             console.log(docs);
//             res.send(docs);
//         });
//     });
// });

// app.use('/site', site);

// app.get('/*', (req, res) => {
//     console.log('site load');
//     res.sendFile(path.join(__dirname + '/build/index.html'));
// });

app.post('/data', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        console.log(req);
        var data = { name: req.body.name, stock: req.body.stock, market: req.body.market, dividend: req.body.dividend };
        console.log(data);
        var collection = db.collection('dividend');
        collection.insert(data, (err, result) => {
            console.log(result);
            res.send(result);
        });
    });
});

app.listen(config.PORT, () => {
    console.log(`server @port ${config.PORT}`);
});
