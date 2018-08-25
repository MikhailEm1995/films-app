const webpack = require('webpack');

const filesPattern = './src/**/*-test.js?(x)';

const getFilesToTest = function() {
    return [filesPattern]
};

module.exports = function(config) {
    var webpackConfig = require('./webpack.config.js');

    webpackConfig.devtool = 'inline-source-map';

    var cfg = {
        browsers: ['PhantomJS_Desktop'],
        files: getFilesToTest(),
        singleRun: true,
        frameworks: ['mocha', 'chai-dom', 'chai'],
        reporters: ['mocha', 'coverage'],
        plugins: [
            require('karma-webpack'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-chai-dom'),
            require('karma-mocha-reporter'),
            require('karma-coverage')
        ],

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true,
            quiet: true
        },

        preprocessors: {
            './src/**/*': ['webpack', 'sourcemap']
        },

        customLaunchers: {
            PhantomJS_Desktop: {
                base: 'PhantomJS',
                options: {
                    viewportSize: {
                        width: 1280,
                        height: 100
                    }
                }
            }
        },

        coverageReporter: {
            check: {
                global: {
                    statements: 86,
                    branches: 80,
                    functions: 95,
                    lines: 40
                }
            }
        },

        browserNoActivityTimeout: 20000
    };

    config.set(cfg);
};