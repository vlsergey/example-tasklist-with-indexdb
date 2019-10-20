/* eslint-env node */
module.exports = function( api ) {
  api.cache( true );

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-flow',
    ],
    plugins: [
      // can be disabled anytime  due to https://github.com/gajus/flow-runtime/issues/237
      'flow-runtime',
      '@babel/plugin-syntax-dynamic-import',
      [ '@babel/plugin-proposal-decorators', { legacy: true } ],
      [ '@babel/plugin-proposal-class-properties', { loose: true } ],
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};
