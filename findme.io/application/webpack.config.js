const path = require('path');

module.exports = {
  root: ['./src'],
  resolve: {
    extensions: [
      '.ios.js',
      '.android.js',
      '.js',
      '.ios.jsx',
      '.android.jsx',
      '.jsx',
      '.jsx',
      '.js',
      '.json',
      'yaml',
      'ts',
      'tsx',
    ],
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@core': path.resolve(__dirname, './src/core'),
      '@locale': path.resolve(__dirname, './src/locale'),
      '@reacts': path.resolve(__dirname, './src/reacts'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@screens': path.resolve(__dirname, './src/screens'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@type': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@src': path.resolve(__dirname, './src'),
    },
  },
};
