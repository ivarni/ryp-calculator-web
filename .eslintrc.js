module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'rules': {
        'react/jsx-indent': [2, 4],
        'indent': [2, 4, { 'SwitchCase': 1 }],
        'import/no-unresolved': [2, { ignore: ['\~*'] }],
        'react/jsx-filename-extension': [0]
    },
    'env': {
        'browser': true
    }
};
