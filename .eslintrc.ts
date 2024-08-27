module.exports = {
    env: {
      browser: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@next/next/recommended',
    ],
    rules: {
      '@next/next/no-sync-scripts': 'off',  // Disables sync script warning
      '@next/next/no-img-element': 'off',   // Disables img element warning
      // Other rules you want to configure
    },
  };
  