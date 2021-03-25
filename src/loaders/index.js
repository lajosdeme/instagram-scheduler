const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')
const passportLoader = require('./passport')
const Logger = require('./logger')

module.exports = async ({ expressApp }) => {
    await mongooseLoader()
    Logger.info('🤖 DB loaded and connected!');

    await passportLoader()
    Logger.info('🛂 Passport loaded.')

    await expressLoader({ app: expressApp })
    Logger.info('🚀 Express loaded.')


}