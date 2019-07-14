module.exports = {
  entry: './script/app.js',        //入口文件
  output:{
    filename: './app.js'        //输出文件
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}