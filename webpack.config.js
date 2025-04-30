const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode:'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules:[
           {
            test: /\.css$/,
            use:[MiniCssExtractPlugin.loader,'css-loader']
           } ,
           {
            test:/\.js$/,
            exclude:/node_modules/,
            use:{
                loader: 'babel-loader',
                options:{
                    presets:['@babel/preset-env']
                }
            }
           }
        ]
    },
    devServer: {
        static:{
            directory:path.resolve(__dirname,'dist')
        },
        port:3000,
        open:true,
        hot:true,
        compress:true,
        historyApiFallback:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'calorie-tracker',
            filename:'index.html',
            template:'./src/index.html',
            favicon: './src/assets/favicon.ico'
        }),
        new MiniCssExtractPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //       { from: './src/assets/favicon.ico', to: 'favicon.ico' }
        //     ]
        //   })
    ]
};