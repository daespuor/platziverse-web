const path= require('path')
module.exports={
    entry:{
        index:['babel-polyfill',path.join(__dirname,'/client-react/index.js')]
    },
    output:{
        filename:'js/app.js',
        path:path.join(__dirname,'public')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['es2015','react']
                    }
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use:{
                    loader:'url-loader',
                    options:{}
                }
            }
        ]
    },
    node: {
        fs: "empty",
        net:"empty",
        tls:"empty"
    }
}