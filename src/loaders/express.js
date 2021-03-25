const express = require('express')
const passport = require('passport')
const routes = require('../api/index')
const path = require('path')
const session = require('express-session')
// const bodyParser = require('body')

module.exports = async ({ app }) => {
  app.use(express.static(path.join(__dirname, '../../public')))
  app.set('view engine', 'ejs')

  app.use(express.json())
  app.use(require('body-parser').urlencoded({ extended: true }))  
  app.use(session({ secret: 'WPNMQLf17fzdLiog2lpbj220DXewmy9r'}));
  app.use(passport.initialize())
  app.use(passport.session())

  // Load API routes
  app.use('/', routes())
}
