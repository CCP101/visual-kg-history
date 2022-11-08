// webpack.config.js
// https://segmentfault.com/a/1190000012536871
// https://webpack.docschina.org/guides/getting-started/#basic-setup

var path = require('path')

module.exports = {
    entry: ['./src/index'],
    mode: 'production',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
    },
    experiments: {
        topLevelAwait: true,
    },
}