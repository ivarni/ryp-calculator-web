module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'rules': {
        'no-underscore-dangle': [0],
        'indent': [2, 4, { 'SwitchCase': 1 }],
        'import/no-extraneous-dependencies': [0],
        'react/jsx-filename-extension': [0],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/forbid-prop-types': [0]
    },
    'env': {
        'browser': true
    }
};
