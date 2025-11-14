const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                namedExport: false,
                                exportLocalsConvention: 'as-is'
                            },
                            sourceMap: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/, 
                exclude: /\.module\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            cleanupOutdatedCaches: true,
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

            runtimeCaching: [
                {
                    urlPattern: /\.(?:js|css|png|jpg|jpeg|svg|ico|woff2?)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'static-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
                        },
                    },
                },
                {
                    urlPattern: /\/$/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'html-cache',
                    },
                }
            ],
        }),
        new CopyPlugin({
            patterns: [
                { from: 'public/manifest.json', to: 'manifest.json' },
                { from: 'public/icons', to: 'icons' }
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        open: true,
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
                cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem'))
            }

        },
        port: 8080,
        historyApiFallback: true
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 600,
        poll: 1000,
    }

};
