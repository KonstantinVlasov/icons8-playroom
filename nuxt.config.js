'use strict'

const favicon = '/vue-static/playroom/icons8-dice-'

const config = {
  mode: 'spa',
  server: {
    host: process.env.HOST || '127.0.0.1'
  },
  head: {
    title: 'Icons8 Playroom',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'noodp' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge, chrome=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', hid: 'favicon-16', sizes: '16x16', href: `${favicon}16.png` },
      { rel: 'icon', type: 'image/png', hid: 'favicon-32', sizes: '32x32', href: `${favicon}32.png` },
      { rel: 'icon', type: 'image/png', hid: 'favicon-48', sizes: '96x96', href: `${favicon}48.png` },
      { rel: 'icon', type: 'image/png', hid: 'favicon-96', sizes: '96x96', href: `${favicon}96.png` }
    ]
  },
  vendor: [
    'axios',
    'babel-polyfill'
  ],
  plugins: [
    { src: '~plugins/components', ssr: false }
  ],
  css: [
    { src: './assets/public.scss', lang: 'scss' }
  ],
  render: {
    resourceHints: false
  },
  build: {
    optimization: {
      splitChunks: {
        name: true
      }
    },
    extend (config) {
      // config.plugins = config.plugins || []
      //
      // // remove svg from url-loader
      // const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/')
      // rule.test = /\.(png|jpe?g|gif|webp)$/
      //
      // // use svg-sprite-loader instead
      // config.module.rules.unshift({
      //   test: /\.svg$/,
      //   use: 'svg-inline-loader',
      //   exclude: /node_modules/
      // })
      // // use url-loader for svg only for npm packages
      // config.module.rules.push({
      //   test: /(.*node_modules)(.*svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: 'imgs/[name].[hash:7].[ext]'
      //   }
      // })
    }
  },
  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-exact-active',
    scrollBehavior: function () {
      return { x: 0, y: 0 }
    }
  },
  loading: {
    color: '#5CA3FD',
    height: '2.5px'
  }
}

module.exports = config
