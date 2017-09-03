/*
 * @Author: z00382069 zhangxinghai 
 * @Date: 2017-08-23 11:27:53 
 * @Last Modified by: z00382069 zhangxinghai
 * @Last Modified time: 2017-08-26 09:16:09
 */
var webpack = require("webpack");
var isProduction = (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production');
var isBackend = (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'backend');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var Path = require('path');

// 获取环境变量
var env = process.env.NODE_ENV;
console.log('Webpack run in ' + env);

var buildPath = Path.resolve(__dirname, 'dist');
var bundlePlugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(env)
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' })
]

if (isProduction) {

    buildPath = Path.resolve(__dirname, 'dist');
    // 生产环境需要进行压缩处理
    var uglifyOptions = {
        compress: { sequences: false, warnings: false, join_vars: false, dead_code: false, unused: false },
        mangle: false
    };
    bundlePlugins.push(new webpack.optimize.UglifyJsPlugin(uglifyOptions));
    bundlePlugins.push(new HtmlWebpackPlugin({
        title: 'PCM',
        inject: 'body',
        // favicon: './App/cm/resources/favicon.ico',
        chunks: ['vendors', 'app' ,'main-style'],
        template: 'indextemlpate.html',
        filename: 'index.html'
    }));
    bundlePlugins.push(new CleanWebpackPlugin(['dist'], {
        root: '', // An absolute path for the root  of webpack.config.js
        verbose: true,// Write logs to console.
        dry: false // Do not delete anything, good for testing.
    }))
    console.log("+++++++++++++++++++++++++++++++++++++");
    console.log("public path is: " + buildPath);
    console.log("+++++++++++++++++++++++++++++++++++++");
}
else if(isBackend){
    buildPath = '../cpi.catalog.release.web/target/classes/static/';
    bundlePlugins.push(new HtmlWebpackPlugin({
        title: 'PCM',
        inject: 'body',
        // favicon: './App/cm/resources/favicon.ico',
        chunks: ['vendors', 'app' ,'main-style'],
        template: 'indextemlpate.html',
        filename: 'index.html'
    }));
    console.log("+++++++++++++++++++++++++++++++++++++");
    console.log("public path is: " + buildPath);
    console.log("+++++++++++++++++++++++++++++++++++++");
}
module.exports = {
    devtool: 'source-map',
    entry: {
        "vendors": [
            'react',
            'react-dom',
            'react-router',
            'object-assign'
        ],
        "app": './App/Index',
        'main-style': './App/business/styles/main.less',
    },
    output: {
        path: buildPath,
        filename: isProduction ? '[name]_[chunkhash].js' : '[name].js',
        publicPath: isProduction || isBackend ? '' : '/static/'
    },
    plugins: bundlePlugins,
    module: {
        loaders: [
            { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
            // less文件
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            { test: /\.(png|PNG|gif|jpg)$/, loader: "url?limit=8192" },
            { test: /\.tsx?$/, loader: "ts-loader" },
            //inconfont字体文件
            { test: /\.(woff|woff2)/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.tsx', '.ts','.less'],
    }
};