require('dotenv').config({ silent: true });

const path = require('path');
const getConfig = require('hjs-webpack')
const webpack = require('webpack');

const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const config = getConfig({
    // entry point for the app
    in: 'src/app.js',

    // Name or full path of output directory
    // commonly named `www` or `public`. This
    // is where your fully static site should
    // end up for simple deployment.
    out: 'dist',

    html: function(context) {
        return {
           'index.html': context.defaultTemplate({
                charset: 'utf-8',
                title: 'RYP',
                lang: 'no',
                metaViewport: {
                    userScalable: true
                }
           })
        };
    },

    output: {
        hash: true
    },

    // This will destroy and re-create your
    // `out` folder before building so you always
    // get a fresh folder. Usually you want this
    // but since it's destructive we make it
    // false by default
    clearBeforeBuild: '!(fonts|favicon.ico)'
});

// Better sourcemaps
if (process.env.NODE_ENV !== 'production') {
    config.devtool = 'source-map';
}

config.plugins.push(new ServiceWorkerWebpackPlugin({
    entry: path.join(__dirname, 'src/sw.js'),
}));

config.plugins.push(new webpack.DefinePlugin({
    GOOGLE_OAUTH_CLIENT_ID: JSON.stringify(process.env.GOOGLE_OAUTH_CLIENT_ID),
    GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
}));


config.resolve = { fallback: path.join(__dirname, "node_modules") },
config.resolveLoader = { fallback: path.join(__dirname, "node_modules") }

module.exports = config;
