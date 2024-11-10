import js from '@eslint/js';
import globals from 'globals';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin-js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['node_modules', 'dist'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: eslintReact.configs.recommended.parserOptions
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: { react: { version: '18.3' } },
    plugins: {
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      '@stylistic': stylistic
    },
    rules: {
      ...js.configs.recommended.rules,
      ...eslintReact.configs.recommended.rules,
      ...eslintReact.configs['jsx-runtime'].rules,
      ...eslintReactHooks.configs.recommended.rules,
      "semi": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "react/jsx-no-target-blank": [
        "error", {
          "allowReferrer": false,
          "enforceDynamicLinks": 'always',
          "warnOnSpreadAttributes": false,
          "links": true,
          "forms": true
        }
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'react/prop-types': [0],
      indent: ['error', 2, { 'SwitchCase': 1 }]
    }
  }
];
