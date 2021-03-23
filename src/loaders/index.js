const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')
const multerLoader = require('./multer')
const Logger = require('./logger')

module.exports = async ({expressApp}) => {
    await mongooseLoader()
    Logger.info('🤖 DB loaded and connected!');

    await expressLoader({app: expressApp})
    Logger.info('🚀 Express loaded.')
}