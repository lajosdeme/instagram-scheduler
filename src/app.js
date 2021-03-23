require('dotenv').config()
const express = require('express')
const loaders = require('./loaders/index')
const Logger = require('./loaders/logger')
const port = process.env.PORT || 3000

async function startServer() {
    const app = express()
    await loaders({expressApp: app})

    app.listen(port, () => {
        Logger.info(`      
        ################################################
        🛠  Server listening on port: ${port} 🛠
        ################################################
        `)
    }).on('error', err => {
        Logger.error(err)
        process.exit(1)
    })
}

startServer()