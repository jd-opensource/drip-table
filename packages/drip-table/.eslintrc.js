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
  'no-new-func': 'off',
  'etc/no-internal': [
    'error',
    {
      ignored: {
        __PARENT_INFO__: 'name',
      },
    },
  ],
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
      if (typeof rule === 'object' && rule.selector.some(selector => ['property', 'method', 'objectLiteralMethod'].includes(selector))) {
        return {
          ...rule,
          filter: {
            // you can expand this regex as you find more cases that require quoting that you want to allow
            // allow `__low_case_const__` and `__UPPER_CASE_CONST__`, such as __REDUX_DEVTOOLS_EXTENSION__
            // allow `ui:xxx`, such as "ui:props"
            // allow `lowercase-property-name`, such as "sample-key-01"
            regex: '(^__[a-z0-9](?:[a-z0-9_]*[a-z0-9]){0,1}__$|^__[A-Z0-9](?:[A-Z0-9_]*[A-Z0-9]){0,1}__$|^ui:.+$|^[a-z0-9]+(?:-[a-z0-9]+)*$)',
            match: false,
          },
        };
      }
      return rule;
    }),
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
          ['@', path.resolve(__dirname, './src')],
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
      excludedFiles: ['src/**'],
      extends: ['lvmcn/javascript/node'],
      rules: buildingToolsJavascriptRules,
    },
    {
      files: ['*.ts', '.*.ts', '*.tsx', '.*.tsx'],
      excludedFiles: ['src/**'],
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
      files: ['src/**/*.js', 'src/**/*.jsx'],
      extends: ['lvmcn/javascript/react'],
      rules: javascriptRules,
    },
    {
      files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.tx'],
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
    // d.ts
    {
      files: ['src/**/*.d.ts'],
      rules: {
        'react/no-typos': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
