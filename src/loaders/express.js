const express = require('express')
const passport = require('passport')
const routes = require('../api/index')
const path = require('path')
const session = require('express-session')
require('dotenv').config()

module.exports = async ({ app }) => {
  app.use(express.static(path.join(__dirname, '../../public')))
  app.set('view engine', 'ejs')

  app.use(express.json())
  app.use(require('body-parser').urlencoded({ extended: true }))  
  app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true}));
  app.use(passport.initialize())
  app.use(passport.session())

  // Load API routes
  app.use('/', routes())
}
