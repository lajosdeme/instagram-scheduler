require('dotenv').config()
const User = require('./schema/User').User
const Logger = require('../loaders/logger')

const createUser = function () {
    if (process.env.IG_USERNAME == undefined) {
        Logger.error('❗️Instagram username missing from environment variables.❗️')
        return
    }
    User.findOne({ username: process.env.IG_USERNAME }, (err, user) => {
        if (err) {
            Logger.error('❗️ Error occurred while creating user.❗️', err)
        } 
        else if (user) {
            return
        } 
        else {
            const user = new User({
                username: process.env.IG_USERNAME
            })
            user.setPassword(process.env.IG_PASSWORD)
            user.save()
                .then(() => {
                    Logger.info('🤝 User created and saved.🤝')
                })
                .catch((error) => {
                    Logger.error('❗️ Error creating and saving user. ❗️', error)
                })
        }
    })
}

module.exports = createUser