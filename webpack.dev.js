const path = require('path');
//[hash:8]
module.exports = {
    entry: {
        'fgp-auth.js': './src/fgp-auth.js',
    },
    output: {
        filename: '[name].bundle.dev.js',      
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    externals: { 
        'keycloak-js': 'Keycloak'
    },
    devtool: 'source-map'
};
