const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { Template } = require('webpack');
module.exports = {
    entry: {
        main: path.resolve(__dirname,"./src/app/index.js"),
    },
    output: {
        filename: "[name].bundles.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Virtual keyboard",
            template: path.resolve(__dirname, "./src/public/template.html"),
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
            },
            
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
        ],
    }

}