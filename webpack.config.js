// webpack.config.js
// https://webpack.docschina.org/guides/getting-started/#basic-setup

let path = require('path')

module.exports = {
    entry: ['./src/index.js'],
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