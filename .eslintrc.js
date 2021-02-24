module.exports = {
  extends: ["blitz"],
  // extends: ['react-app', 'plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y'],
  env: {
    es2020: true,
  },
  // rules: {
  //   'import/no-anonymous-default-export': 'error',
  //   'import/no-webpack-loader-syntax': 'off',
  //   'react/react-in-jsx-scope': 'off', // React is always in scope with Blitz
  //   'jsx-a11y/anchor-is-valid': 'off', //Doesn't play well with Blitz/Next <Link> usage
  // },
  ignorePatterns: [".next/", ".blitz/"],
}
