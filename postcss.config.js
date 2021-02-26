const isDev = process.env.NODE_ENV !== 'production'

const defaultCOnfig = {
  plugins: {
    ...(!isDev && {
      'postcss-flexbugs-fixes': {},
      'postcss-preset-env': {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    }),
  },
}

module.exports = {
  ...defaultCOnfig,
  plugins: {
    ...defaultCOnfig.plugins,

    // tailwind, optiomized
    'postcss-import': {
      plugins: [],
      path: ['./node_modules'],
    },
    tailwindcss: {},
    'postcss-preset-env': {
      ...defaultCOnfig.plugins['postcss-preset-env'],
      // dev
      ...(isDev && {
        autoprefixer: {}, // no need to prefix for dev
        features: {
          'nesting-rules': true,
        },
      }),
    },
  },

  // // dev
  // ...(isDev && {
  //   sourceMap: false, // TODO: how to disable
  // }),
}

// // tailwind postcss.config.js
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
