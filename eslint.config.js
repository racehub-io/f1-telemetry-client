const eslint = require('@eslint/js');
const {defineConfig} = require('eslint/config');
const tseslint = require('typescript-eslint');

module.exports = defineConfig([
  {ignores: ['build/**']},
  eslint.configs.recommended,
  {files: ['*.js'], languageOptions: {sourceType: 'commonjs'}},
  {
    files: ['src/**/*.ts'],
    extends: [tseslint.configs.recommended],
    languageOptions: {parserOptions: {project: './tsconfig.json'}},
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]);
