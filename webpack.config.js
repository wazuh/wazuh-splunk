const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {

  node: {
    fs: 'empty'
  },
  output: {
    filename: 'visualization.js',
    libraryTarget: 'amd'
  },

  plugins: [

    new ConcatPlugin({
      // examples
      uglify: false,
      sourceMap: false,
      name: 'bundle',
      outputPath: 'dist',
      fileName: '[name].js',
      filesToConcat: ['./SplunkAppForWazuh/appserver/static/js/**/*.js'],
      attributes: {
        async: true
      }
    })
  ]
}
