/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('ryp-calculator/lib/store/configureStore.prod');
} else {
    module.exports = require('ryp-calculator/lib/store/configureStore.dev');
}
/* eslint-enable global-require */
