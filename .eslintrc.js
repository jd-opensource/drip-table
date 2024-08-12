const path = require('path');

const importResolverExtensions = [
  '.js',
  '.jsx',
  '.jx',
  '.ts',
  '.tsx',
  '.tx',
];

const javascriptRules = {
  'no-console': 'off',
  'react/jsx-no-bind': 'off',
  'react/no-unstable-nested-components': 'off',
  'react/no-unused-class-component-methods': 'off',
  'react/prop-types': 'off',
  'react/sort-comp': 'off',
  'unicorn/no-array-callback-reference': 'off',
  'unicorn/no-array-for-each': 'off',
  'unicorn/no-array-reduce': 'off',
  'unicorn/prefer-switch': 'off',
};

const typescriptRules = {
  ...javascriptRules,
};

const buildingToolsJavascriptRules = {
  camelcase: 'off',
  'global-require': 'off',
  'id-match': 'off',
  'multiline-comment-style': 'off',
  'no-console': 'off',
  'no-sync': 'off',
  'no-underscore-dangle': 'off',
  'node/global-require': 'off',
  'node/no-unpublished-require': 'off',
  'unicorn/prefer-module': 'off',
};

const buildingToolsTypescriptRules = {
  ...buildingToolsJavascriptRules,
  '@typescript-eslint/naming-convention': 'off',
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
          ['@', path.resolve(__dirname, './')],
        ],
        extensions: importResolverExtensions,
      },
      node: {
        extensions: importResolverExtensions,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.tx'],
    },
    react: {
      version: 'detect',
    },
  },
  noInlineConfig: true,
  overrides: [
    // ----------------------
    //  json files
    // ----------------------
    {
      files: ['.json', '.*.json'],
      extends: ['lvmcn/json'],
    },
    // ----------------------
    //  building tools files
    // ----------------------
    {
      files: ['*.js', '.*.js'],
      excludedFiles: ['docs/**', 'docs-static/**', 'packages/**'],
      extends: ['lvmcn/javascript/node'],
      rules: buildingToolsJavascriptRules,
    },
    {
      files: ['*.ts', '.*.ts', '*.tsx', '.*.tsx'],
      excludedFiles: ['docs/**', 'docs-static/**', 'packages/**'],
      extends: ['lvmcn/typescript/node'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
          modules: true,
          jsx: true,
          legacyDecorators: true,
        },
        sourceType: 'module',
        project: './tsconfig.json',
      },
      rules: buildingToolsTypescriptRules,
    },
    // ----------------------
    //  project source files
    // ----------------------
    {
      files: ['docs/**/*.js', 'docs/**/*.jsx'],
      extends: ['lvmcn/javascript/react'],
      rules: javascriptRules,
    },
    {
      files: ['docs/**/*.ts', 'docs/**/*.tsx', 'docs/**/*.tx'],
      extends: ['lvmcn/typescript/react'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
          modules: true,
          jsx: true,
          legacyDecorators: true,
        },
        sourceType: 'module',
        project: './tsconfig.json',
      },
      rules: typescriptRules,
    },
    {
      files: ['docs-static/**/*.js'],
      rules: {
        'no-dupe-keys': 'error',
        'no-global-assign': 'error',
        'no-native-reassign': 'error',
        'no-undef': 'error',
        'no-unsafe-negation': 'error',
      },
    },
    // d.ts
    {
      files: ['docs/**/*.d.ts'],
      rules: {
        'react/no-typos': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
