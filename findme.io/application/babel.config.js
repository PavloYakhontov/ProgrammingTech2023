module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
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
          'ts',
          'tsx',
          'yaml',
        ],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@core': './src/core',
          '@locale': './src/locale',
          '@reacts': './src/reacts',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@styles': './src/styles',
          '@type': './src/types',
          '@utils': './src/utils',
          '@src': './src',
        },
      },
    ],
  ],
};
