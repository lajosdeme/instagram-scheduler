const express = require('express')
const routes = require('./routes/routes')

module.exports = () => {
    const app = express.Router()
    routes(app)
    return app
}