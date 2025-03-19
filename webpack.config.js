const path = require('path');

module.exports = {
  entry: './src/index.js', // Your main JS file
  output: {
    filename: 'bundle.js', // The bundled file name
    path: path.resolve(__dirname, 'dist'), // Output folder
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // Process CSS
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource', // Process images
      },
    ],
  },
};
