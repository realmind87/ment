module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier', 'import'],
  rules: {
    'prefer-arrow-callback': 'off',
    'arrow-body-style': 'error',
    'no-var': 'error',
    'no-dupe-keys': 'error',
    'react/prop-types': 'off',
  },
};
