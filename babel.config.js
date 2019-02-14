module.exports = {
  presets: [
    '@vue/app',
    ['@babel/preset-env', {
      'useBuiltIns': false,
      debug: true,
      'targets': {
        'chrome':'70',
        'esmodules': true
      }
    }
    ]
  ]
};
