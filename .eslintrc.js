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
    'no-bitwise': 'off',
    'no-return-assign': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'no-unused-vars': 'warn',
    'default-case': 'warn',
    'object-curly-newline': 'off',
    'camelcase': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'no-irregular-whitespace': 'off',
    'max-len': ["error", { "code": 120 }]
  },
};
