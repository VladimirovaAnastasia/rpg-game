module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 'off',
    'no-unused-vars': 'warn',
    'default-case': 'warn',
    'object-curly-newline': 'off'
  },
};
