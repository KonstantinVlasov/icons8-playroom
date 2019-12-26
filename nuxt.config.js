'use strict'

const favicon = '/vue-static/playroom/licons-9-short'

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
      { rel: 'icon', type: 'image/png', hid: 'favicon-16', sizes: '16x16', href: `${favicon}.png` },
      { rel: 'icon', type: 'image/png', hid: 'favicon-32', sizes: '32x32', href: `${favicon}.png` },
      { rel: 'icon', type: 'image/png', hid: 'favicon-48', sizes: '96x96', href: `${favicon}.png` },
      { rel: 'icon', type: 'image/png', hid: 'favicon-96', sizes: '96x96', href: `${favicon}.png` }
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
  buildDir: '.nuxt',
  build: {
    publicPath: '/_nuxt/playroom/',
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[name].[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[name].[chunkhash].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[name].[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[hash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[hash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[hash:7].[ext]'
    }
  },
  router: {
    middleware: ['auth'],
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
