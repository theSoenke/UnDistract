module.exports = {
    entry: [
        './src/index.ts',
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    "ts-loader"
                ]
            },
        ],
    },
    devtool: "false"
};
