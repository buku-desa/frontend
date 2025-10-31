const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  // include recommended shared configs via compat
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ),
  {
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // allow new JSX runtime (no need to have React in scope)
      'react/react-in-jsx-scope': 'off',
    },
  },
];
// Compatibility wrapper: load the existing .eslintrc.cjs legacy config
module.exports = require('./.eslintrc.cjs');
