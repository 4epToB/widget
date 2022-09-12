const webpack = require('webpack')
module.exports = {
  configureWebpack: config => {
    config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }))
  },
  chainWebpack:config => {
      config.optimization.delete('splitChunks')
    },
  filenameHashing: false,
    publicPath  : process.env.NODE_ENV === 'production' ? 'https://incandescent-lollipop-c5880f.netlify.app':'',
}
