const path = require('path');
module.exports = {
    entry: {
        'fgp-auth': './src/index.ts'
    },
    devtool: 'source-map', //inline-source-map
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    // externals:{
    //     'keycloak-js': 'Keycloak'
    // },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'lib',
        libraryTarget: "umd",
        umdNamedDefine: true,
        globalObject: "(typeof self !== 'undefined' ? self : this)"
    }
};