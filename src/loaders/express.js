const express = require('express')
const routes = require('../api/index')

module.exports = async ({ app }) => {
    app.use(express.static('public'))
    app.use(express.json(), express.urlencoded({ extended: false }))
    app.set('view engine', 'ejs')
      // Load API routes
    app.use('/', routes())
}
