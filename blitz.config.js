const isDev = process.env.NODE_ENV !== 'production'

const i18n = {
  locales: ['en', 'zh-hk'],
  defaultLocale: 'zh-hk',
  ...(isDev && {
    localeDetection: false,
  }),
}
// Uncomment this to customize the webpack config
const webpack = (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config

  // TODO: check if 'eval-cheap-module-source-map' is really needed
  // https://github.com/vercel/next.js/blob/master/errors/improper-devtool.md
  if (dev) {
    Object.defineProperty(config, 'devtool', {
      get: () => 'eval-cheap-module-source-map',
      set: () => {},
    })
  }

  return config
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  poweredByHeader: false,
  trailingSlash: false, // TODO: change back to true if got redirect error
  cleanUrls: true,
  i18n,
}

module.exports = isDev
  ? {
      ...config,
      webpack,
    }
  : withBundleAnalyzer(config)

// // Uncomment this to customize the webpack config
// const webpack = (config, { buildId, dev, isServer, defaultLoaders, webpack }) =>
//   // Note: we provide webpack above so you should not `require` it
//   // Perform customizations to webpack config
//   // Important: return the modified config
//   ({
//     ...require('webpack-merge').merge(config, {
//       // dev
//       ...(dev && {
//         // mode: 'development',
//         devtool: 'eval-cheap-module-source-map',
//         module: {
//           rules: [
//             // postcss-loader
//             {
//               test: /\.(pcss|css)$/,
//               use: [
//                 {
//                   loader: 'style-loader',
//                 },
//                 {
//                   loader: 'postcss-loader',
//                   options: {
//                     sourceMap: false,
//                     config: {
//                       path: require('path').resolve(__dirname),
//                     },
//                   },
//                 },
//               ],
//             },
//             // },
//           ],
//         },
//         // Configure the Postcss loader
//       }),
//       //
//       // prod
//       ...(!dev && {
//         // mode: 'production',
//         devtool: 'source-map',
//         module: {
//           rules: [
//             // postcss-loader
//             {
//               test: /\.(pcss|css)$/,
//               use: [
//                 {
//                   loader: 'postcss-loader',
//                   options: {
//                     sourceMap: true,
//                     config: {
//                       path: require('path').resolve(__dirname),
//                     },
//                   },
//                 },
//               ],
//             },
//             // },
//             // // Don't generate CSS for the modern config in production
//             // // MODERN_CONFIG
//             // {
//             //   test: /\.(pcss|css)$/,
//             //   loader: 'ignore-loader',
//             // },
//           ],
//         },
//       }),
//       //
//     }),
//   })
