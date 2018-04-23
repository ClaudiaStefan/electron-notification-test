const path = require('path');
const webpack = require('webpack');

const mainConfig = {
    target: "electron-main",
    entry: {
        main: './app/main/main.js'
    },
    
    // Location and filename pattern of the
    // final build output files.
    output: {
        path: path.join(__dirname, 'build'),
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /(\.js$|\.jsx$)/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, 'app'),
            },
            {
                test: /(\.js$|\.jsx$)/,
                use: ['babel-loader'],
                exclude: /node_modules/,
                include: __dirname,
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

const renderConfig = {
    target: "electron-renderer",
    devtool: "source-map",
    entry: {
        entry: './app/renderer/entry.jsx',
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: "[name].bundle.js"
    },

    devServer: {
        //content from here will be automatically served
        contentBase: './app/renderer/public',
        publicPath: 'http://localhost:8182/build/'
    },


    module: {
        rules: [
            {
                enforce: 'pre',
                test: /(\.js$|\.jsx$)/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, 'app'),
            },
            {
                test: /(\.js$|\.jsx$)/,
                use: ['babel-loader'],
                exclude: /node_modules/,
                include: __dirname,
            },
            {
                // Post-css loader and its plugins.
                test: /\.(styl|css)$/,
                include: path.resolve(__dirname, "app/renderer/styles"),
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'stylus-loader' },
                ],
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = [ mainConfig, renderConfig ];