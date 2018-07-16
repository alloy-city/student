const path = require('path');

const opts = {
    DEBUG: false,
    "ifdef-verbose": true,
    "ifdef-triple-slash": true
};

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            use: [{ loader: "ifdef-loader", options: opts }],
            exclude: /node_modules/
        }]
    },
    output: {
        filename: 'student-bundle.js',
        path: path.resolve("../../Alloy-Server-v3.0/apps/pantoufle/public/static-files/modules")
    },
    mode: 'production'
};