var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// var fse = require('fs-extra');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/data', function (request, response) {
    (async () => {
        MongoClient.connect(config.MONGO_URI, (err, db) => {
            if (err) {
                console.log('error');
                console.log(err);
            } else {
                const cursor = db.collection('dividend');
                console.log(typeof cursor);
                const totals = cursor.find().toArray(function (err, docs) {
                    if (err) {
                        // Reject the Promise with an error
                        console.log('error', err);
                    } else {

                        res.send(docs);
                    }
                });
            }
        });
    })
})

module.exports = router;
