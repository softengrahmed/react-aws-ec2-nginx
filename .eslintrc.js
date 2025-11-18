module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },
  overrides: [
    {
      files: ['tests/**/*.ts'],
      rules: {
        'playwright/no-conditional-in-test': 'error',
        'playwright/no-force-option': 'error',
        'playwright/no-wait-for-timeout': 'error',
        'playwright/no-skipped-test': 'warn',
      },
    },
  ],
};
