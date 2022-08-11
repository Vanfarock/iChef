module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      alias: {}, // Add alias for imports (from tsconfig) here
    }],
  ],
  ignore: [
    '**/*.spec.ts',
  ],
}
