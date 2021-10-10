const presets = [
  ['@babel/preset-env', {
    targets: {
      edge: '94',
      ie: '11',
      firefox: '94',
      chrome: '95',
      safari: '15'
    },
    useBuiltIns: "entry"
  }]
];

module.exports = { presets };
