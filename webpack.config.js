// webpack.config.js
// https://webpack.docschina.org/guides/getting-started/#basic-setup
// 同步配套babel进行编译
// babel需要保证全部统一为babel 7版本 安装时为安装@bable版本

let path = require('path')

module.exports = {
    entry: ['./javascript/KG_G6.js'],
    mode: 'production',
    target: ['web', 'es5'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                },

            }
        ],
    },
    experiments: {
        topLevelAwait: true,
    },
}