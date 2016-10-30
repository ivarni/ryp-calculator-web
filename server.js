require('dotenv').config({ silent: true });

var express = require('express');
var fallback = require('express-history-api-fallback');
var path = require('path');
var aws = require('aws-sdk');

var app = express();
app.set('port', process.env.PORT || 3000);

var root = path.join(__dirname, 'dist');
/*
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
aws.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY
});
aws.config.update({
    region: 'eu-west-1',
    signatureVersion: 'v4'
});

var docClient = new aws.DynamoDB.DocumentClient({region: 'eu-west-1'});

var params = { TableName: 'RypData' };
docClient.scan(params, function(err, data) {
    if (err) {
        return console.log(err)
    }
    console.log(data)
});
*/
app.get('/.well-known/acme-challenge/:acmeToken', function(req, res, next) {
    var acmeToken = req.params.acmeToken;
    var acmeKey;

    if (process.env.ACME_KEY && process.env.ACME_TOKEN) {
        if (acmeToken === process.env.ACME_TOKEN) {
            acmeKey = process.env.ACME_KEY;
        }
    }

    for (var key in process.env) {
        if (key.startsWith('ACME_TOKEN_')) {
            var num = key.split('ACME_TOKEN_')[1];
            if (acmeToken === process.env['ACME_TOKEN_' + num]) {
                acmeKey = process.env['ACME_KEY_' + num];
            }
        }
    }

    if (acmeKey) res.send(acmeKey);
    else res.status(404).send();
});

app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
