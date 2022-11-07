// webpack.config.js
// webpack从零开始第1课:安装webpack和webpack-dev-server
// https://segmentfault.com/a/1190000012536871

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