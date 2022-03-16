const path = require('path');

const extensions = ['.js', '.jsx', '.jx', '.ts', '.tsx', '.tx'];
const javascriptRules = {
  'no-new-func': 'off',
  'react/jsx-no-bind': 'off',
  'react/prop-types': 'off',
  'react/sort-comp': 'off',
  'unicorn/no-array-callback-reference': 'off',
  'unicorn/no-array-for-each': 'off',
  'unicorn/no-array-reduce': 'off',
  'unicorn/prefer-switch': 'off',
};
const typescriptRules = {
  ...javascriptRules,
  '@typescript-eslint/naming-convention': require('eslint-config-lvmcn/typescript/plugins/base')
    .rules['@typescript-eslint/naming-convention']
    .map((rule) => {
      if (typeof rule === 'object' && rule.selector.includes('property')) {
        return {
          ...rule,
          filter: {
            // you can expand this regex as you find more cases that require quoting that you want to allow
            // allow `__low_case_const__` and `__UPPER_CASE_CONST__`, such as __REDUX_DEVTOOLS_EXTENSION__
            // allow `ui:xxx`, such as "ui:props"
            regex: '(^__[a-z0-9](?:[a-z0-9_]*[a-z0-9]){0,1}__$|^__[A-Z0-9](?:[A-Z0-9_]*[A-Z0-9]){0,1}__$|^ui:.+$)',
            match: false,
          },
        };
      }
      return rule;
    }),
};

// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      modules: true,
      jsx: true,
      legacyDecorators: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: [
    'import',
    'json',
    'react',
    'unicorn',
    'unused-imports',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', path.resolve(__dirname, './src')],
        ],
        extensions,
      },
      node: {
        extensions,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  noInlineConfig: true,
  overrides: [
    // building tools files
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.tx', '.*.js', '.*.jsx', '.*.ts', '.*.tsx', '.*.tx'],
      excludedFiles: ['src/**'],
      extends: ['lvmcn/javascript/node', 'lvmcn/json'],
      rules: {
        camelcase: 'off',
        'global-require': 'off',
        'id-match': 'off',
        'multiline-comment-style': 'off',
        'no-console': 'off',
        'no-sync': 'off',
        'no-underscore-dangle': 'off',
        'node/no-unpublished-require': 'off',
        'unicorn/prefer-module': 'off',
      },
    },
    // src files
    {
      files: ['src/**/*.js', 'src/**/*.jsx'],
      extends: ['lvmcn/javascript/react'],
      rules: javascriptRules,
    },
    {
      files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.tx'],
      extends: ['lvmcn/javascript/react'],
      rules: typescriptRules,
    },
    // src typescript files
    {
      files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.tx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
          modules: true,
          jsx: true,
          legacyDecorators: true,
          experimentalObjectRestSpread: true,
        },
        sourceType: 'module',
        project: './tsconfig.json',
      },
      extends: ['lvmcn/typescript/react'],
      rules: typescriptRules,
    },
    // src store services files
    {
      files: [
        'src/store/services/**/*.ts',
        'src/store/services/**/*.tsx',
      ],
      rules: {
        'unicorn/filename-case': 'off',
        'unicorn/no-array-for-each': 'off',
        '@typescript-eslint/no-redeclare': 'off',
      },
    },
    // src d.ts files
    {
      files: ['src/**/*.d.ts'],
      rules: {
        'react/no-typos': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    // src utils files
    {
      files: ['src/utils/*.ts'],
      rules: {},
    },
    // src utils logger
    {
      files: ['src/utils/logger.ts'],
      rules: { 'no-console': 'off' },
    },
  ],
  ignorePatterns: [
    '/dist',
  ],
};
