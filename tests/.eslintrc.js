module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
    'prettier',
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'playwright/no-wait-for-timeout': 'error',
    'playwright/no-force-option': 'error',
    'playwright/no-conditional-in-test': 'error',
    'playwright/valid-expect': 'error',
  },
  ignorePatterns: ['node_modules', 'dist', 'playwright-report'],
};
