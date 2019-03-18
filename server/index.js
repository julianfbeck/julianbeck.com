const express = require('express')
const consola = require('consola')
const api = require("./api")
const {
  Nuxt,
  Builder
} = require('nuxt')
const bodyParser = require("body-parser")
const app = express()
const session = require('express-session')


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use('/api', api)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  // Sessions to create `req.session`
  app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
  }))

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()