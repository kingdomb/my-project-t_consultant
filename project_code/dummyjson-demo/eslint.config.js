import pluginImport from 'eslint-plugin-import';

export default [
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': 'warn',
    },
    settings: {
      'import/resolver': {
        'babel-module': {},
      },
    },
  },
];