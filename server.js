var express = require('express');
var fallback = require('express-history-api-fallback');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

const root = path.join(__dirname, 'dist');

app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
