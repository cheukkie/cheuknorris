const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        app: ['@babel/polyfill','./src/js/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.scss$/,
                use: [
                        "style-loader",
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
            },
            {
                test: /\.css$/,
                use: [
                        "style-loader",
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                }

        ]
    }
}