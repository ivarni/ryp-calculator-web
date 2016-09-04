var express = require('express');
var fallback = require('express-history-api-fallback');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

var root = path.join(__dirname, 'dist');

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
