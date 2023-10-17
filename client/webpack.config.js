const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: "",
    },
    plugins: [
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js"
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "J.A.T.E.",
        description: "A simple text editor progressive web app.",
        background_color: "#0D1117",
        theme_color: "#42A5F5",
        display: "standalone",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 500],
          }
        ]
      }),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      })
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin()
      ]
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
  };
};
