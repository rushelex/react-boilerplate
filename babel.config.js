const env = {
  production: {
    plugins: [
      ['transform-react-remove-prop-types', {
        mode: 'remove',
        removeImport: true,
        ignoreFilenames: ['node_modules'],
      }],
    ],
  },
};

const presets = [
  [
    '@babel/env',
    {
      modules: "commonjs",
      targets: {
        esmodules: true,
      },
      useBuiltIns: 'entry',
      corejs: '3',
    },
  ],
  ['@babel/react'],
];

const plugins = [
  "@babel/plugin-transform-modules-commonjs",
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
];

module.exports = { env, presets, plugins };
