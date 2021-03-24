const mongoose = require('mongoose')
const mongodb = require('mongodb')
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/instascheduler'

module.exports = async function () {
    const connection = mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    return (await connection).connection.db
}