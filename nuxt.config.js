const path = require('path')
const builtAt = new Date().toISOString()

export default {
  mode: 'universal',
  

  /*
   ** Headers of the page
   */
  head: {
    title: 'Julian Beck | Computer Science Student',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@kickbeak' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:updated_time', content: builtAt },

      {
        hid: 'description',
        name: 'description',
        content: 'Julian Becks Personal website and blog'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { rel: 'apple-touch-icon', type: 'image/png', href: '/favicons/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'manifest', href: '/favicons/site.webmanifest' },
      { rel: 'mask-icon', href: 'href="/favicons/safari-pinned-tab.svg',color:'#5bbad5' },
      { rel: 'shortcut icon', href: '/favicons/favicon.ico' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'blue',
    height: '3px'
  },

  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/main.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/lazyload', '~/plugins/globalComponents'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    'nuxt-buefy',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'vue-scrollto/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    ['qonfucius-nuxt-fontawesome'],
    ["@nuxtjs/google-analytics"],
  ],
  styleResources: {
    scss: [
      '@/assets/css/utilities/_variables.scss',
    ],
  },

  fontAwesome: {
    packs: [{
      package: '@fortawesome/fontawesome-free-brands',
      icons: ['faGithub', "faLinkedin", "faInstagram"],
    }, ],
  },
  axios: {
    // proxyHeaders: false
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            baseURL: "https://julianbeck.com/",
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            baseURL: "https://julianbeck.com/",
            url: '/api/auth/logout',
            method: 'post'
          },
          user: {
            baseURL: "https://julianbeck.com/",
            url: '/api/auth/user',
            method: 'get',
            propertyName: 'user'
          }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    },
    redirect: {
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
