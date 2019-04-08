const pkg = require('./package')
const path = require('path')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    'nuxt-buefy',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    ['qonfucius-nuxt-fontawesome'], 
  ],
  fontAwesome: {
    packs: [
      {
        package: '@fortawesome/fontawesome-free-brands',
        icons: ['faGithub',"faLinkedin","faInstagram"],
      },
    ],
  },
  axios: {
    // proxyHeaders: false
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'https://julianbeck.de/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: 'https://julianbeck.de/api/auth/logout', method: 'post' },
          user: { url: 'https://julianbeck.de/api/auth/user', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    },
    redirect:{
      home: "/devices"
    }
  },
 

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'contents'),
        options: {
          vue: {
            root: "dynamicMarkdown"
          }
        }
      });
    }
  }
}
