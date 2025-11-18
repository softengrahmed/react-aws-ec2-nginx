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
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'playwright/no-wait-for-timeout': 'error',
    'playwright/no-force-option': 'error',
    'playwright/no-conditional-in-test': 'warn',
    'playwright/valid-expect': 'error',
  },
  overrides: [
    {
      files: ['tests/**/*.ts'],
      rules: {
        'playwright/expect-expect': 'error',
        'playwright/no-skipped-test': process.env.CI ? 'error' : 'warn',
        'playwright/no-focused-test': process.env.CI ? 'error' : 'warn',
      },
    },
  ],
};
